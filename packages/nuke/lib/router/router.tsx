import {
  type ComponentType,
  type FC,
  type JSX,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {mapOption} from '@/util.js';

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
  url: new URL(window.location.href),
  href: window.location.href,
  base: '',
  pathname: cleanPath(window.location.pathname),
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
  children: ReactNode;
};

export const Router: FC<RouterProps> = ({base = '', children}) => {
  const [href, setHref] = useState(window.location.href);
  const url = useMemo(() => new URL(href), [href]);

  const navigate = useCallback(
    (url: string) => {
      const u = new URL(url, window.location.origin + base).href;
      window.history.pushState({}, '', u);
      setHref(u);
    },
    [setHref, base],
  );

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      'popstate',
      () => {
        setHref(window.location.href);
      },
      {signal: controller.signal},
    );
    return () => {
      controller.abort();
    };
  }, [setHref]);

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
    if (!key) {
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
