export interface MediaMatcherAPI {
  readonly matchMedia: (
    mediaQuery: string,
    listener?: {handler: (matches: boolean) => void; signal: AbortSignal},
  ) => boolean;
}

const MediaQueryChangeEventType = 'change';

const isMediaQueryChangeEvent = (e: Event): e is MediaQueryListEvent => {
  return e.type === MediaQueryChangeEventType;
};

export class BrowserMediaMatcher implements MediaMatcherAPI {
  public matchMedia(
    this: this,
    mediaQuery: string,
    listener?: {handler: (matches: boolean) => void; signal: AbortSignal},
  ): boolean {
    const match = window.matchMedia(mediaQuery);
    if (listener !== undefined) {
      match.addEventListener(
        MediaQueryChangeEventType,
        (e) => {
          listener.handler(e.matches);
        },
        {signal: listener.signal},
      );
    }
    return match.matches;
  }
}

export class MemMediaMatcher implements MediaMatcherAPI {
  readonly #matches: Set<string>;
  readonly #emitter: EventTarget;

  public constructor() {
    this.#matches = new Set();
    this.#emitter = new EventTarget();
  }

  public matchMedia(
    this: this,
    mediaQuery: string,
    listener?: {handler: (matches: boolean) => void; signal: AbortSignal},
  ): boolean {
    if (listener !== undefined) {
      this.#emitter.addEventListener(
        MediaQueryChangeEventType,
        (e) => {
          if (!isMediaQueryChangeEvent(e)) {
            return;
          }
          if (e.media !== mediaQuery) {
            return;
          }
          listener.handler(e.matches);
        },
        {signal: listener.signal},
      );
    }
    return this.#matches.has(mediaQuery);
  }

  public setMediaQueryMatch(mediaQuery: string, matches: boolean): void {
    if (matches) {
      this.#matches.add(mediaQuery);
    } else {
      this.#matches.delete(mediaQuery);
    }
    this.#emitter.dispatchEvent(
      new MediaQueryListEvent(MediaQueryChangeEventType, {
        matches,
        media: mediaQuery,
      }),
    );
  }
}
