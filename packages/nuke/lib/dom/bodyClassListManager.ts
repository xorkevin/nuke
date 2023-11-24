export interface BodyClassListManager {
  readonly add: (...tokens: string[]) => void;
  readonly replace: (oldToken: string, newToken: string) => boolean;
  readonly remove: (...tokens: string[]) => void;
  readonly contains: (token: string) => boolean;
}

export class BrowserBodyClassListManager implements BodyClassListManager {
  public add(this: this, ...tokens: string[]): void {
    document.body.classList.add(...tokens);
  }

  public replace(this: this, oldToken: string, newToken: string): boolean {
    return document.body.classList.replace(oldToken, newToken);
  }

  public remove(this: this, ...tokens: string[]): void {
    document.body.classList.remove(...tokens);
  }

  public contains(this: this, token: string): boolean {
    return document.body.classList.contains(token);
  }
}

export class MemBodyClassListManager implements BodyClassListManager {
  #classlist: Set<string>;

  public constructor() {
    this.#classlist = new Set();
  }

  public add(this: this, ...tokens: string[]): void {
    for (const v of tokens) {
      this.#classlist.add(v);
    }
  }

  public replace(this: this, oldToken: string, newToken: string): boolean {
    const removed = this.#classlist.delete(oldToken);
    if (removed) {
      this.#classlist.add(newToken);
    }
    return removed;
  }

  public remove(this: this, ...tokens: string[]): void {
    for (const v of tokens) {
      this.#classlist.delete(v);
    }
  }

  public contains(this: this, token: string): boolean {
    return this.#classlist.has(token);
  }
}
