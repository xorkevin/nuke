import 'global-jsdom/register';

export type JSDomOpts = {
  url?: string;
};

interface Jsdom {
  reconfigure(opts: JSDomOpts): void;
}

interface GlobalWithJsdom {
  $jsdom: Jsdom;
}

export const jsdomReconfigure = (opts: JSDomOpts) => {
  (globalThis as unknown as GlobalWithJsdom).$jsdom.reconfigure(opts);
};
