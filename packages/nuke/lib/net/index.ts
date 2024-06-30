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
      new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT),
    );
    this.#wsStatus = WS_STATUS.CLOSED;
  }

  public connect(signal: AbortSignal): void {
    if (this.#connecting) {
      return;
    }
    const controller = new AbortController();
    signal.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      {signal: controller.signal},
    );
    this.#connecting = true;
    this.#wsStatus = WS_STATUS.CONNECTING;
    Atomics.store(this.#state, 0, WS_STATUS.CONNECTING);

    void (async () => {
      let backoff = 250;
      while (!isSignalAborted(controller.signal)) {
        this.#wsStatus = WS_STATUS.CONNECTING;
        Atomics.store(this.#state, 0, WS_STATUS.CONNECTING);

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
          this.#wsStatus = WS_STATUS.OPEN;
          this.#eventTarget.dispatchEvent(ev);
        });
        ws.addEventListener('close', (ev: CloseEvent) => {
          this.#wsStatus = WS_STATUS.CLOSED;
          Atomics.store(this.#state, 0, WS_STATUS.CLOSED);
          Atomics.notify(this.#state, 0);
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
            valToEnum(WS_STATUS, Atomics.load(this.#state, 0)) ??
            WS_STATUS.CLOSED;
          if (s === WS_STATUS.CLOSED) {
            break;
          }
          const r = Atomics.waitAsync(this.#state, 0, s, 15000);
          if (r.async) {
            await r.value;
          }
          if (
            ws.readyState === WebSocket.OPEN &&
            isNonNil(openedAt) &&
            performance.now() - openedAt > 14000
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

      this.#connecting = false;
    })();
  }

  public getStatus(this: this): WS_STATUS {
    return this.#wsStatus;
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
