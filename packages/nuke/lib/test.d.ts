declare module 'global-jsdom' {
  import type {ConstructorOptions} from 'jsdom';

  function globalJsdom(html?: string, options?: ConstructorOptions): () => void;

  export default globalJsdom;
}
