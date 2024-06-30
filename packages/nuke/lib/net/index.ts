import {
  TypedEventTarget,
  expBackoff,
  isNonNil,
  isSignalAborted,
  sleep,
} from '#internal/computil/index.js';

const WS_STATUS = Object.freeze({
  CLOSED: 0,
  CONNECTING: 1,
  OPEN: 2,
});

export class WS {
  readonly #url: string;
  readonly #protocols: readonly string[];
  readonly #binaryType: BinaryType;
  readonly #eventTarget: TypedEventTarget<WebSocketEventMap>;
  #connecting: boolean;

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
  }

  public connect(signal: AbortSignal): void {
    if (this.#connecting) {
      return;
    }
    const controller = new AbortController();
    controller.signal.addEventListener('abort', () => {
      this.#connecting = false;
    });
    signal.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      {signal: controller.signal},
    );
    this.#connecting = true;

    void (async () => {
      let backoff = 250;
      while (!isSignalAborted(controller.signal)) {
        const state = new Int32Array(
          new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT),
        );
        Atomics.store(state, 0, WS_STATUS.CONNECTING);

        let ws: WebSocket;
        try {
          ws = new WebSocket(this.#url, this.#protocols.slice());
          ws.binaryType = this.#binaryType;
        } catch (err) {
          console.error('Failed to construct websocket', err);
          controller.abort();
          return;
        }

        let openedAt: number | undefined;
        ws.addEventListener('open', (ev: Event) => {
          openedAt = performance.now();
          Atomics.store(state, 0, WS_STATUS.OPEN);
          Atomics.notify(state, 0);
          this.#eventTarget.dispatchEvent(ev);
        });
        ws.addEventListener('close', (ev: CloseEvent) => {
          Atomics.store(state, 0, WS_STATUS.CLOSED);
          Atomics.notify(state, 0);
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
          const s = Atomics.load(state, 0);
          if (s === WS_STATUS.CLOSED) {
            break;
          }
          const r = Atomics.waitAsync(state, 0, s, 15000);
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
          return;
        }

        await sleep(backoff, {signal: controller.signal});
        backoff = expBackoff(backoff, 2, 30000);
      }
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
