export interface StorageAPI {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
  readonly removeItem: (key: string) => void;
  readonly onStorage: (
    keys: Set<string>,
    handler: (e: StorageEvent) => void,
    signal: AbortSignal,
  ) => void;
}

const StorageEventType = 'storage';

export class BrowserLocalStorage implements StorageAPI {
  public getItem(this: this, key: string): string | null {
    return localStorage.getItem(key);
  }

  public setItem(this: this, key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeItem(this: this, key: string): void {
    localStorage.removeItem(key);
  }

  public onStorage(
    this: this,
    keys: Set<string>,
    handler: (e: StorageEvent) => void,
    signal: AbortSignal,
  ): void {
    window.addEventListener(
      StorageEventType,
      (e) => {
        if (e.storageArea !== localStorage) {
          return;
        }
        // key is null from storage clear method
        if (e.key !== null && !keys.has(e.key)) {
          return;
        }
        handler(e);
      },
      {signal},
    );
  }
}

const isStorageEvent = (e: Event): e is StorageEvent => {
  return e.type === StorageEventType;
};

export class MemStorage implements StorageAPI {
  readonly #store: Map<string, string>;
  readonly #emitter: EventTarget;

  public constructor() {
    this.#store = new Map();
    this.#emitter = new EventTarget();
  }

  public getItem(this: this, key: string): string | null {
    return this.#store.get(key) ?? null;
  }

  public setItem(this: this, key: string, value: string): void {
    this.#store.set(key, value);
  }

  public removeItem(this: this, key: string): void {
    this.#store.delete(key);
  }

  public onStorage(
    this: this,
    keys: Set<string>,
    handler: (e: StorageEvent) => void,
    signal: AbortSignal,
  ): void {
    this.#emitter.addEventListener(
      StorageEventType,
      (e) => {
        if (!isStorageEvent(e)) {
          return;
        }
        // key is null from storage clear method
        if (e.key !== null && !keys.has(e.key)) {
          return;
        }
        handler(e);
      },
      {signal},
    );
  }

  public extSetItem(this: this, key: string, value: string): void {
    const oldValue = this.#store.get(key) ?? null;
    this.#store.set(key, value);
    this.sendEvent(key, value, oldValue);
  }

  public extRemoveItem(this: this, key: string): void {
    const oldValue = this.#store.get(key) ?? null;
    this.#store.delete(key);
    this.sendEvent(key, null, oldValue);
  }

  public extClear(this: this): void {
    this.#store.clear();
    this.sendEvent(null, null, null);
  }

  private sendEvent(
    this: this,
    key: string | null,
    newValue: string | null,
    oldValue: string | null,
  ): void {
    this.#emitter.dispatchEvent(
      Object.assign(new Event(StorageEventType), {
        key,
        newValue,
        oldValue,
      }),
    );
  }
}
