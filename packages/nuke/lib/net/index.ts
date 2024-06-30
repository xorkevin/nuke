import {expBackoff, sleep} from '#internal/computil/index.js';

const WS_STATUS = Object.freeze({
  CLOSED: 0,
  CONNECTING: 1,
  OPEN: 2,
});

export class WS {
  #url: string;
  #protocols: readonly string[];
  #binaryType: BinaryType;
  #connecting: boolean;

  constructor(
    url: string,
    protocols: readonly string[] = [],
    binaryType: BinaryType = 'blob',
  ) {
    this.#url = url;
    this.#protocols = protocols;
    this.#binaryType = binaryType;
    this.#connecting = false;
  }

  public connect(signal: AbortSignal) {
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

    (async () => {
      let backoff = 250;
      while (!controller.signal.aborted) {
        let state = new Int32Array(
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

        ws.addEventListener('open', () => {
          Atomics.store(state, 0, WS_STATUS.OPEN);
          Atomics.notify(state, 0);
        });
        ws.addEventListener('close', () => {
          Atomics.store(state, 0, WS_STATUS.CLOSED);
          Atomics.notify(state, 0);
        });
        ws.addEventListener('message', (ev: MessageEvent<unknown>) => {
          ev.data;
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
          const r = Atomics.waitAsync(state, 0, s, 30000);
          if (r.async) {
            const v = await r.value;
            if (v === 'timed-out') {
              backoff = 250;
            }
          }
        }
        ctrl.abort();

        if (controller.signal.aborted) {
          return;
        }

        await sleep(backoff, {signal: controller.signal});
        backoff = expBackoff(backoff, 2, 30000);
      }
    })();
  }
}
