import {
  type ComponentType,
  type FC,
  type JSX,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {mapOption} from '#internal/util.js';

export interface HistoryAPI {
  url(): string;
  origin(): string;
  navigate(u: string): void;
  onNavigate(handler: (u: string) => void, signal: AbortSignal): void;
  abortController(): AbortController;
}

class BrowserHistory {
  url(): string {
    return window.location.href;
  }

  origin(): string {
    return window.location.origin;
  }

  navigate(u: string): void {
    window.history.pushState({}, '', u);
  }

  onNavigate(handler: (u: string) => void, signal: AbortSignal) {
    window.addEventListener(
      'popstate',
      () => {
        handler(window.location.href);
      },
      {signal},
    );
  }

  abortController(): AbortController {
    return new AbortController();
  }
}

const cleanPath = (pathname: string): string => {
  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const RouterContext = createContext<{
  url: URL;
  href: string;
  base: string;
  pathname: string;
  navigate: (url: string) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  url: new URL(window?.location?.href ?? 'http://localhost:8080'),
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  href: window?.location?.href ?? 'http://localhost:8080',
  base: '',
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  pathname: cleanPath(window?.location?.pathname ?? ''),
  navigate: () => {},
});

export type RouteParams = {
  [key: string]: string;
};

const RouteContext = createContext<{
  prefix: string;
  params: RouteParams;
  rest: string;
}>({
  prefix: '',
  params: {},
  rest: '',
});

export type RouterProps = {
  base?: string;
  history?: HistoryAPI;
};

const defaultHistory = new BrowserHistory();

export const Router: FC<PropsWithChildren<RouterProps>> = ({
  base = '',
  history = defaultHistory,
  children,
}) => {
  const [href, setHref] = useState(history.url());
  const url = useMemo(() => new URL(href), [href]);

  const navigate = useCallback(
    (url: string) => {
      const u = history.origin() + base + url;
      history.navigate(u);
      setHref(u);
    },
    [setHref, base, history],
  );

  useEffect(() => {
    const controller = history.abortController();
    history.onNavigate((u) => {
      setHref(u);
    }, controller.signal);
    return () => {
      controller.abort();
    };
  }, [setHref, history]);

  const pathname = useMemo(() => {
    if (base.endsWith('/')) {
      return null;
    }
    let pathname = cleanPath(url.pathname);
    if (base === '') {
      return pathname;
    }
    if (!pathname.startsWith(base)) {
      return null;
    }
    pathname = cleanPath(pathname.slice(base.length));
    if (pathname === '') {
      return '';
    }
    if (!pathname.startsWith('/')) {
      return null;
    }
    return pathname;
  }, [base, url.pathname]);

  const routerCtx = useMemo(() => {
    return {
      url,
      href,
      base,
      pathname: pathname ?? '',
      navigate,
    };
  }, [href, url, base, pathname, navigate]);

  const routeCtx = useMemo(
    () => ({
      prefix: '',
      params: {},
      rest: pathname ?? '',
    }),
    [pathname],
  );

  if (pathname === null) {
    return null;
  }

  return (
    <RouterContext.Provider value={routerCtx}>
      <RouteContext.Provider value={routeCtx}>{children}</RouteContext.Provider>
    </RouterContext.Provider>
  );
};

export type Route = {
  path: string;
  exact?: boolean;
  component: ComponentType;
};

type CompiledPatternSegment =
  | {
      kind: 'str';
      match: string;
    }
  | {
      kind: 'param';
      key: string;
    };

const SEGMENT_PATTERN_REGEX = /^{(?<key>[^}]*)}$/;

const compilePattern = (pattern: string): CompiledPatternSegment[] | null => {
  if (!pattern.startsWith('/')) {
    return null;
  }
  const segments = pattern.slice(1).split('/');
  if (segments.some((v) => v === '' || v === '{}')) {
    return null;
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

const compileRoute = (route: Route): CompiledRoute | null => {
  const match = compilePattern(route.path);
  if (match === null) {
    return null;
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
): {prefix: string; params: RouteParams; rest: string} | null => {
  const params: RouteParams = {};
  let rest = pathname;
  for (const segment of match) {
    if (rest.at(0) !== '/') {
      return null;
    }
    rest = rest.slice(1);
    if (segment.kind === 'str') {
      if (!rest.startsWith(segment.match)) {
        return null;
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
      return null;
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
  routes: Route[];
  fallbackRedir?: string;
  fallback?: JSX.Element;
};

export const Routes: FC<RoutesProps> = ({routes, fallbackRedir, fallback}) => {
  const {navigate} = useContext(RouterContext);
  const {prefix, params, rest} = useContext(RouteContext);

  const compiledRoutes = useMemo(
    () => routes.flatMap((v) => mapOption(compileRoute(v))),
    [routes],
  );

  const match = useMemo(() => {
    for (const route of compiledRoutes) {
      const match = matchRoute(rest, route.match, route.exact);
      if (match === null) {
        continue;
      }
      return {
        component: route.component,
        prefix: match.prefix,
        params: match.params,
        rest: match.rest,
      };
    }
    return null;
  }, [compiledRoutes, rest]);

  useEffect(() => {
    if (match === null && fallbackRedir !== undefined) {
      navigate(prefix + fallbackRedir);
    }
  }, [navigate, prefix, match, fallbackRedir]);

  const subRouteCtx = useMemo(
    () => ({
      prefix: prefix + (match?.prefix ?? ''),
      params: Object.assign({}, match?.params, params),
      rest: match?.rest ?? '',
    }),
    [prefix, params, match],
  );

  if (match === null) {
    if (fallback) {
      return fallback;
    }
    return null;
  }

  const ChildComponent = match.component;

  return (
    <RouteContext.Provider value={subRouteCtx}>
      <ChildComponent />
    </RouteContext.Provider>
  );
};
