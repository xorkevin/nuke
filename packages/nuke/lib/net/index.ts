import {
  CondVar,
  RingBuf,
  TypedEventTarget,
  expBackoff,
  isNil,
  isNonNil,
  isSignalAborted,
  randomHexID,
  sleep,
} from '#internal/computil/index.js';

export class WS {
  readonly #id: string;
  readonly #url: string;
  readonly #protocols: readonly string[];
  readonly #binaryType: BinaryType;
  readonly #eventTarget: TypedEventTarget<WebSocketEventMap>;
  #connecting: boolean;
  readonly #condConn: CondVar;
  #wsopen: boolean;
  #wsconnecting: boolean;
  readonly #condWSStatus: CondVar;
  readonly #sendQueue: RingBuf<
    ArrayBufferLike | ArrayBufferView | Blob | string
  >;

  public constructor(
    url: string,
    protocols: readonly string[] = [],
    binaryType: BinaryType = 'blob',
  ) {
    this.#id = randomHexID();
    this.#url = url;
    this.#protocols = protocols;
    this.#binaryType = binaryType;
    this.#eventTarget = new TypedEventTarget();
    this.#connecting = false;
    this.#condConn = new CondVar();
    this.#wsopen = false;
    this.#wsconnecting = false;
    this.#condWSStatus = new CondVar();
    this.#sendQueue = new RingBuf();
  }

  public isConnecting(this: this): boolean {
    return this.#connecting;
  }

  private setConnecting(this: this, status: boolean) {
    this.#connecting = status;
    this.#condConn.notify();
  }

  public async waitDisconnected(
    this: this,
    opts?: {signal?: AbortSignal},
  ): Promise<void> {
    while (isNil(opts?.signal) || !isSignalAborted(opts.signal)) {
      if (!this.#connecting) {
        break;
      }
      await this.#condConn.wait(opts);
    }
  }

  public isOpen(this: this): boolean {
    return this.#wsopen;
  }

  private setWSOpen(this: this, status: boolean) {
    this.#wsconnecting = false;
    this.#wsopen = status;
    this.#condWSStatus.notify();
  }

  private pokeWSStatus(this: this) {
    this.#condWSStatus.notify();
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

  private log(this: this, message: string, ...params: unknown[]) {
    console.info(message, ...params, {
      id: this.#id,
      url: this.#url,
      protocols: this.#protocols,
      binaryType: this.#binaryType,
    });
  }

  private logError(this: this, message: string, ...params: unknown[]) {
    console.error(message, ...params, {
      id: this.#id,
      url: this.#url,
      protocols: this.#protocols,
      binaryType: this.#binaryType,
    });
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
        this.log('Connecting WS');
        let ws: WebSocket;
        try {
          ws = new WebSocket(this.#url, this.#protocols.slice());
          ws.binaryType = this.#binaryType;
        } catch (err) {
          this.logError('Failed to construct websocket', err);
          controller.abort();
          continue;
        }
        this.#wsconnecting = true as boolean;

        let openedAt: number | undefined;
        ws.addEventListener('open', (ev: Event) => {
          openedAt = performance.now();
          this.log('WS open');
          this.setWSOpen(true);
          this.#eventTarget.dispatchEvent(new Event(ev.type, ev));
          this.transmitSendQueue(ws);
        });
        ws.addEventListener('close', (ev: CloseEvent) => {
          this.log('WS close');
          if (isNonNil(openedAt) && performance.now() - openedAt > 7500) {
            backoff = 250;
          }
          this.setWSOpen(false);
          this.#eventTarget.dispatchEvent(new CloseEvent(ev.type, ev));
        });
        ws.addEventListener('message', (ev: MessageEvent<unknown>) => {
          this.#eventTarget.dispatchEvent(
            new MessageEvent(
              ev.type,
              ev as unknown as MessageEventInit<unknown>,
            ),
          );
        });
        ws.addEventListener('error', (ev: Event) => {
          this.#eventTarget.dispatchEvent(new Event(ev.type, ev));
        });

        const ctrl = new AbortController();
        controller.signal.addEventListener(
          'abort',
          () => {
            ws.close(1000, 'Client close');
          },
          {signal: ctrl.signal},
        );
        while (this.#wsconnecting || this.#wsopen) {
          await this.#condWSStatus.wait();
          if (ws.readyState === WebSocket.OPEN) {
            this.transmitSendQueue(ws);
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

  public send(data: string): void {
    this.#sendQueue.write(data);
    this.pokeWSStatus();
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
