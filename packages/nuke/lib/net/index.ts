import {
  TypedEventTarget,
  expBackoff,
  isNonNil,
  isSignalAborted,
  sleep,
  valToEnum,
} from '#internal/computil/index.js';

export enum WS_STATUS {
  CLOSED = 0,
  CONNECTING = 1,
  OPEN = 2,
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
  #wsStatus: WS_STATUS;
  readonly #state: Int32Array;

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
    this.#state = new Int32Array(
      new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT),
    );
    this.#wsStatus = WS_STATUS.CLOSED;
  }

  public isConnecting(this: this): boolean {
    return this.#connecting;
  }

  private setConnecting(this: this, status: boolean) {
    this.#connecting = status;
    Atomics.store(
      this.#state,
      STATE_IDX.CONNECTING,
      status ? WS_STATUS.CONNECTING : WS_STATUS.CLOSED,
    );
    Atomics.notify(this.#state, STATE_IDX.CONNECTING);
  }

  public async waitDisconnected(): Promise<void> {
    while (true) {
      const s =
        valToEnum(WS_STATUS, Atomics.load(this.#state, STATE_IDX.CONNECTING)) ??
        WS_STATUS.CLOSED;
      if (s === WS_STATUS.CLOSED) {
        break;
      }
      const r = Atomics.waitAsync(this.#state, STATE_IDX.CONNECTING, s, 15000);
      if (r.async) {
        await r.value;
      }
    }
  }

  public getStatus(this: this): WS_STATUS {
    return this.#wsStatus;
  }

  private setStatus(this: this, status: WS_STATUS) {
    this.#wsStatus = status;
    Atomics.store(this.#state, STATE_IDX.STATUS, status);
    Atomics.notify(this.#state, STATE_IDX.STATUS);
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
    this.setStatus(WS_STATUS.CONNECTING);

    void (async () => {
      let backoff = 250;
      while (!isSignalAborted(controller.signal)) {
        this.setStatus(WS_STATUS.CONNECTING);

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
          this.setStatus(WS_STATUS.OPEN);
          this.#eventTarget.dispatchEvent(ev);
        });
        ws.addEventListener('close', (ev: CloseEvent) => {
          this.setStatus(WS_STATUS.CLOSED);
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
