import {
  type AnchorHTMLAttributes,
  type ComponentType,
  type FC,
  type JSX,
  type MouseEventHandler,
  type PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  type Mutable,
  classNames,
  isNonNullable,
} from '#internal/computil/index.js';

export interface HistoryAPI {
  readonly url: () => string;
  readonly origin: () => string;
  readonly navigate: (u: string) => void;
  readonly onNavigate: (
    handler: (u: string) => void,
    signal: AbortSignal,
  ) => void;
}

class BrowserHistory implements HistoryAPI {
  public url(this: this): string {
    return window.location.href;
  }

  public origin(this: this): string {
    return window.location.origin;
  }

  public navigate(this: this, u: string): void {
    window.history.pushState({}, '', u);
  }

  public onNavigate(
    this: this,
    handler: (u: string) => void,
    signal: AbortSignal,
  ) {
    window.addEventListener(
      'popstate',
      () => {
        handler(window.location.href);
      },
      {signal},
    );
  }
}

const cleanPath = (pathname: string): string => {
  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

export type RouterCtx = {
  readonly url: URL;
  readonly href: string;
  readonly base: string;
  readonly pathname: string;
  readonly join: (url: string) => string;
  readonly navigate: (url: string) => void;
};

const RouterContext = createContext<RouterCtx>(
  Object.freeze({
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    url: new URL(window?.location?.href ?? 'http://localhost:8080'),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    href: window?.location?.href ?? 'http://localhost:8080',
    base: '',
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    pathname: cleanPath(window?.location?.pathname ?? ''),
    join: (url: string) => url,
    navigate: () => {},
  }),
);

export type RouteParams = {
  readonly [key: string]: string;
};

export type RouteCtx = {
  readonly prefix: string;
  readonly params: RouteParams;
  readonly rest: string;
  readonly join: (url: string) => string;
  readonly navigate: (url: string) => void;
};

const RouteContext = createContext<RouteCtx>(
  Object.freeze({
    prefix: '',
    params: {},
    rest: '',
    join: (url: string) => url,
    navigate: () => {},
  }),
);

export type RouterProps = {
  readonly base?: string;
  readonly history?: HistoryAPI;
};

const defaultHistory = new BrowserHistory();

export const Router: FC<PropsWithChildren<RouterProps>> = ({
  base = '',
  history = defaultHistory,
  children,
}) => {
  const [href, setHref] = useState(() => history.url());
  const url = useMemo(() => new URL(href), [href]);

  const join = useCallback(
    (url: string): string => {
      if (url.startsWith('/')) {
        return url;
      }
      if (url === '') {
        return base;
      }
      return base + '/' + url;
    },
    [base],
  );

  const navigate = useCallback(
    (url: string) => {
      const u = history.origin() + join(url);
      history.navigate(u);
      setHref(u);
    },
    [history, join, setHref],
  );

  useEffect(() => {
    const controller = new AbortController();
    history.onNavigate((u) => {
      setHref(u);
    }, controller.signal);
    return () => {
      controller.abort();
    };
  }, [setHref, history]);

  const pathname = useMemo(() => {
    if (base.endsWith('/')) {
      return undefined;
    }
    const pathname = cleanPath(url.pathname);
    if (base === '') {
      return pathname;
    }
    if (pathname !== base && !pathname.startsWith(base + '/')) {
      return undefined;
    }
    return pathname.slice(base.length);
  }, [base, url.pathname]);

  const routerCtx = useMemo(
    () =>
      Object.freeze({
        url,
        href,
        base,
        pathname: pathname ?? '',
        join,
        navigate,
      }),
    [href, url, base, pathname, join, navigate],
  );

  const routeCtx = useMemo(
    () =>
      Object.freeze({
        prefix: base,
        params: {},
        rest: pathname ?? '',
        join,
        navigate,
      }),
    [base, pathname, join, navigate],
  );

  if (pathname === undefined) {
    return undefined;
  }

  return (
    <RouterContext.Provider value={routerCtx}>
      <RouteContext.Provider value={routeCtx}>{children}</RouteContext.Provider>
    </RouterContext.Provider>
  );
};

export type Route = {
  readonly path: string;
  readonly exact?: boolean;
  readonly component: ComponentType;
};

type CompiledPatternSegment =
  | {
      kind: 'param';
      key: string;
    }
  | {
      kind: 'str';
      match: string;
    };

const SEGMENT_PATTERN_REGEX = /^{(?<key>[^}]*)}$/;

const compilePattern = (
  pattern: string,
): CompiledPatternSegment[] | undefined => {
  if (pattern === '') {
    return [];
  }
  if (!pattern.startsWith('/')) {
    return undefined;
  }
  const segments = pattern.slice(1).split('/');
  if (segments.some((v) => v === '' || v === '{}')) {
    return undefined;
  }
  return segments.reduce<CompiledPatternSegment[]>((acc, v) => {
    const match = SEGMENT_PATTERN_REGEX.exec(v);
    const key = match?.groups?.['key'];
    if (key === undefined) {
      const last = acc.at(-1);
      if (last?.kind === 'str') {
        last.match += '/' + v;
        return acc;
      }
      acc.push({
        kind: 'str',
        match: v,
      });
      return acc;
    }
    acc.push({
      kind: 'param',
      key,
    });
    return acc;
  }, []);
};

type CompiledRoute = {
  exact: boolean;
  match: CompiledPatternSegment[];
  component: ComponentType;
};

const compileRoute = (route: Route): CompiledRoute | undefined => {
  const match = compilePattern(route.path);
  if (match === undefined) {
    return undefined;
  }
  return {
    match,
    exact: route.exact ?? false,
    component: route.component,
  };
};

const matchRoute = (
  pathname: string,
  match: CompiledPatternSegment[],
  exact: boolean,
): {prefix: string; params: RouteParams; rest: string} | undefined => {
  const params: Mutable<RouteParams> = {};
  let rest = pathname;
  for (const segment of match) {
    if (!rest.startsWith('/')) {
      return undefined;
    }
    rest = rest.slice(1);
    if (segment.kind === 'str') {
      if (rest !== segment.match && !rest.startsWith(segment.match + '/')) {
        return undefined;
      }
      rest = rest.slice(segment.match.length);
    } else {
      const idx = rest.indexOf('/');
      if (idx < 0) {
        params[segment.key] = rest;
        rest = '';
      } else {
        params[segment.key] = rest.slice(0, idx);
        rest = rest.slice(idx);
      }
    }
  }
  if (exact) {
    if (rest !== '') {
      return undefined;
    }
    return {
      prefix: pathname,
      params,
      rest,
    };
  }
  return {
    prefix: pathname.slice(0, pathname.length - rest.length),
    params,
    rest,
  };
};

export type RoutesProps = {
  readonly routes: Route[];
  readonly fallbackRedir?: string;
  readonly fallback?: JSX.Element;
};

export const Routes: FC<RoutesProps> = ({routes, fallbackRedir, fallback}) => {
  const {navigate} = useContext(RouterContext);
  const {prefix, params, rest} = useContext(RouteContext);

  const compiledRoutes = useMemo(
    () => routes.map(compileRoute).filter(isNonNullable),
    [routes],
  );

  const match = useMemo(() => {
    for (const route of compiledRoutes) {
      const match = matchRoute(rest, route.match, route.exact);
      if (match === undefined) {
        continue;
      }
      return {
        component: route.component,
        prefix: match.prefix,
        params: match.params,
        rest: match.rest,
      };
    }
    return undefined;
  }, [compiledRoutes, rest]);

  const routeNotFound = match === undefined;

  useEffect(() => {
    if (routeNotFound && fallbackRedir !== undefined) {
      if (fallbackRedir === '') {
        navigate(prefix);
      } else if (fallbackRedir.startsWith('/')) {
        navigate(fallbackRedir);
      } else {
        navigate(prefix + '/' + fallbackRedir);
      }
    }
  }, [routeNotFound, fallbackRedir, navigate, prefix]);

  const subPrefix = prefix + (match?.prefix ?? '');

  const subJoin = useCallback(
    (url: string): string => {
      if (url.startsWith('/')) {
        return url;
      }
      if (url === '') {
        return subPrefix;
      }
      return subPrefix + '/' + url;
    },
    [subPrefix],
  );

  const subNavigate = useCallback(
    (url: string) => {
      navigate(subJoin(url));
    },
    [subJoin, navigate],
  );

  const subRouteCtx = useMemo(
    () =>
      Object.freeze({
        prefix: subPrefix,
        params: Object.freeze(Object.assign({}, params, match?.params)),
        rest: match?.rest ?? '',
        join: subJoin,
        navigate: subNavigate,
      }),
    [subPrefix, params, match, subJoin, subNavigate],
  );

  if (routeNotFound) {
    if (fallback) {
      return fallback;
    }
    return undefined;
  }

  const ChildComponent = match.component;

  return (
    <RouteContext.Provider value={subRouteCtx}>
      <ChildComponent />
    </RouteContext.Provider>
  );
};

export const useRouter = (): RouterCtx => {
  return useContext(RouterContext);
};

export const useRoute = (): RouteCtx => {
  return useContext(RouteContext);
};

const matchURL = (pathname: string, match: string, exact: boolean): boolean => {
  if (match !== '') {
    if (match.startsWith('/')) {
      // TODO handle absolute paths
      return false;
    }
    if (!pathname.startsWith('/')) {
      return false;
    }
    pathname = pathname.slice(1);
    if (pathname !== match && !pathname.startsWith(match + '/')) {
      return false;
    }
    pathname = pathname.slice(match.length);
  }
  if (exact) {
    return pathname === '';
  }
  return true;
};

export type NavAnchorHook = {
  readonly href: string | undefined;
  readonly matches: boolean;
  readonly nav: () => void;
};

export const useNavAnchor = (
  url: string | undefined,
  exact: boolean,
): NavAnchorHook => {
  const {rest, join, navigate} = useRoute();

  const href = useMemo(
    () => (url === undefined ? undefined : join(url)),
    [url, join],
  );

  const nav = useCallback(() => {
    if (url === undefined) {
      return;
    }
    navigate(url);
  }, [url, navigate]);

  const matches = useMemo(
    () => (url === undefined ? false : matchURL(rest, url, exact)),
    [rest, url, exact],
  );

  const res = useMemo(() => ({href, matches, nav}), [href, matches, nav]);
  return res;
};

export type NavAnchorProps = {
  readonly matchesClassName: string;
  readonly matchesClassNameExact?: boolean;
};

export const NavAnchor = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & NavAnchorProps>
>(
  (
    {
      matchesClassName = 'nuke-nav-anchor-matches',
      matchesClassNameExact = false,
      className,
      href = '#',
      children,
      ...props
    },
    ref,
  ) => {
    const {
      href: fullHref,
      matches,
      nav,
    } = useNavAnchor(href, matchesClassNameExact);
    const c = classNames(className, {
      [matchesClassName]: matches,
    });
    const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
      (e) => {
        e.preventDefault();
        nav();
      },
      [nav],
    );
    return (
      <a ref={ref} className={c} href={fullHref} onClick={onClick} {...props}>
        {children}
      </a>
    );
  },
);
