import {
  RingBuf,
  TypedEventTarget,
  expBackoff,
  isNil,
  isNonNil,
  isSignalAborted,
  sleep,
  valToEnum,
} from '#internal/computil/index.js';

enum WS_STATUS {
  CLOSED = 0,
  OPEN = 1,
}

enum CONN_STATUS {
  CLOSED = 0,
  CONNECTING = 1,
}

const STATE_IDX = Object.freeze({
  CONNECTING: 0,
  STATUS: 1,
});

export class WS {
  readonly #url: string;
  readonly #protocols: readonly string[];
  readonly #binaryType: BinaryType;
  readonly #eventTarget: TypedEventTarget<WebSocketEventMap>;
  #connecting: boolean;
  #wsopen: boolean;
  readonly #state: Int32Array;
  readonly #sendQueue: RingBuf<
    ArrayBufferLike | ArrayBufferView | Blob | string
  >;

  public constructor(
    url: string,
    protocols: readonly string[] = [],
    binaryType: BinaryType = 'blob',
  ) {
    this.#url = url;
    this.#protocols = protocols;
    this.#binaryType = binaryType;
    this.#eventTarget = new TypedEventTarget();
    this.#connecting = false;
    this.#wsopen = false;
    this.#state = new Int32Array(
      new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT),
    );
    this.#sendQueue = new RingBuf();
  }

  public isConnecting(this: this): boolean {
    return this.#connecting;
  }

  private setConnecting(this: this, status: boolean) {
    this.#connecting = status;
    Atomics.store(
      this.#state,
      STATE_IDX.CONNECTING,
      status ? CONN_STATUS.CONNECTING : CONN_STATUS.CLOSED,
    );
    Atomics.notify(this.#state, STATE_IDX.CONNECTING);
  }

  public async waitDisconnected(): Promise<void> {
    while (true) {
      const s =
        valToEnum(
          CONN_STATUS,
          Atomics.load(this.#state, STATE_IDX.CONNECTING),
        ) ?? CONN_STATUS.CLOSED;
      if (s === CONN_STATUS.CLOSED) {
        break;
      }
      const r = Atomics.waitAsync(this.#state, STATE_IDX.CONNECTING, s, 15000);
      if (r.async) {
        await r.value;
      }
    }
  }

  public isOpen(this: this): boolean {
    return this.#wsopen;
  }

  private setStatus(this: this, status: boolean) {
    this.#wsopen = status;
    Atomics.store(
      this.#state,
      STATE_IDX.STATUS,
      status ? WS_STATUS.OPEN : WS_STATUS.CLOSED,
    );
    Atomics.notify(this.#state, STATE_IDX.STATUS);
  }

  private pokeStatus(this: this) {
    Atomics.notify(this.#state, STATE_IDX.STATUS);
  }

  private transmitSendQueue(this: this, ws: WebSocket) {
    while (ws.readyState === WebSocket.OPEN) {
      const m = this.#sendQueue.read();
      if (isNil(m)) {
        break;
      }
      ws.send(m);
    }
  }

  public connect(signal: AbortSignal): void {
    if (this.isConnecting()) {
      throw new Error('Already connecting');
    }
    const controller = new AbortController();
    signal.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      {signal: controller.signal},
    );
    this.setConnecting(true);

    void (async () => {
      let backoff = 250;
      while (!isSignalAborted(controller.signal)) {
        let ws: WebSocket;
        try {
          ws = new WebSocket(this.#url, this.#protocols.slice());
          ws.binaryType = this.#binaryType;
        } catch (err) {
          console.error('Failed to construct websocket', err);
          controller.abort();
          continue;
        }

        let openedAt: number | undefined;
        ws.addEventListener('open', (ev: Event) => {
          openedAt = performance.now();
          this.setStatus(true);
          this.#eventTarget.dispatchEvent(ev);
          this.transmitSendQueue(ws);
        });
        ws.addEventListener('close', (ev: CloseEvent) => {
          this.setStatus(false);
          this.#eventTarget.dispatchEvent(ev);
        });
        ws.addEventListener('message', (ev: MessageEvent<unknown>) => {
          this.#eventTarget.dispatchEvent(ev);
        });
        ws.addEventListener('error', (ev: Event) => {
          this.#eventTarget.dispatchEvent(ev);
        });

        const ctrl = new AbortController();
        controller.signal.addEventListener(
          'abort',
          () => {
            ws.close(1000, 'Client close');
          },
          {signal: ctrl.signal},
        );
        while (true) {
          const s =
            valToEnum(WS_STATUS, Atomics.load(this.#state, STATE_IDX.STATUS)) ??
            WS_STATUS.CLOSED;
          if (s === WS_STATUS.CLOSED) {
            break;
          }
          const r = Atomics.waitAsync(this.#state, STATE_IDX.STATUS, s, 15000);
          if (r.async) {
            await r.value;
          }
          if (
            ws.readyState === WebSocket.OPEN &&
            isNonNil(openedAt) &&
            performance.now() - openedAt > 7500
          ) {
            backoff = 250;
          }
          this.transmitSendQueue(ws);
        }
        ctrl.abort();

        if (isSignalAborted(controller.signal)) {
          continue;
        }

        await sleep(backoff, {signal: controller.signal});
        backoff = expBackoff(backoff, 2, 30000);
      }

      this.setConnecting(false);
    })();
  }

  public send(data: string): void {
    this.#sendQueue.write(data);
    this.pokeStatus();
  }

  public addEventListener<K extends keyof WebSocketEventMap>(
    kind: K,
    listener: (ev: WebSocketEventMap[K]) => unknown,
    opts?: AddEventListenerOptions,
  ): void {
    this.#eventTarget.addEventListener(kind, listener, opts);
  }

  public removeEventListener(
    kind: string,
    listener: EventListenerOrEventListenerObject | null,
    opts?: EventListenerOptions | boolean,
  ): void {
    this.#eventTarget.removeEventListener(kind, listener, opts);
  }
}
