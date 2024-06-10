import {
  type AnchorHTMLAttributes,
  type AriaAttributes,
  type ComponentType,
  type FC,
  type JSX,
  type MouseEventHandler,
  type PropsWithChildren,
  createContext,
  forwardRef,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  type Mutable,
  classNames,
  isNil,
  isNonNil,
  parseURL,
} from '#internal/computil/index.js';

export type NavTarget = {
  pathname: string;
  search?: string | undefined;
  hash?: string | undefined;
};

export type NavOptions = {
  replace?: boolean;
};

export interface HistoryAPI {
  readonly url: () => string;
  readonly origin: () => string;
  readonly navigate: (u: string, opts?: NavOptions) => void;
  readonly onNavigate: (
    handler: (u: string) => void,
    signal: AbortSignal,
  ) => void;
}

export class BrowserHistory implements HistoryAPI {
  public url(this: this): string {
    return window.location.href;
  }

  public origin(this: this): string {
    return window.location.origin;
  }

  public navigate(this: this, u: string, opts?: NavOptions): void {
    if (opts?.replace === true) {
      window.history.replaceState({}, '', u);
    } else {
      window.history.pushState({}, '', u);
    }
  }

  public onNavigate(
    this: this,
    handler: (u: string) => void,
    signal: AbortSignal,
  ): void {
    window.addEventListener(
      'popstate',
      () => {
        handler(window.location.href);
      },
      {signal},
    );
  }
}

const isPathAbsolute = (path: string): boolean => path.startsWith('/');

const cleanPath = (path: string): string => {
  const segments: string[] = [];
  for (const seg of path.split('/')) {
    switch (seg) {
      // ignore empty and current segments
      case '':
      case '.':
        break;
      // handle parent dir
      case '..':
        segments.pop();
        break;
      default:
        segments.push(seg);
        break;
    }
  }

  return segments.join('/');
};

const toPathPrefix = (path: string): string => {
  path = cleanPath(path);
  return path === '' ? '' : '/' + path;
};

const toAbsolutePath = (path: string): string => '/' + cleanPath(path);

const joinPaths = (...parts: string[]): string => cleanPath(parts.join('/'));

const isPathPrefix = (path: string, prefix: string): boolean =>
  prefix === '' || path === prefix || path.startsWith(prefix + '/');

const pathToNavTarget = (pathname: string): NavTarget => {
  let hash: string | undefined = undefined;
  const hashIndex = pathname.indexOf('#');
  if (hashIndex >= 0) {
    hash = pathname.slice(hashIndex + 1);
    pathname = pathname.slice(0, hashIndex);
  }

  let search: string | undefined = undefined;
  const searchIndex = pathname.indexOf('?');
  if (searchIndex >= 0) {
    const params = new URLSearchParams(pathname.slice(searchIndex + 1));
    params.sort();
    search = params.toString();
    pathname = pathname.slice(0, searchIndex);
  }

  return {
    pathname,
    search,
    hash,
  };
};

const resolvePath = (path: NavTarget | string, base?: string): string => {
  const u = typeof path === 'string' ? pathToNavTarget(path) : path;
  let s = '';
  if (isNil(base) || isPathAbsolute(u.pathname)) {
    s = toAbsolutePath(u.pathname);
  } else {
    s = '/' + joinPaths(base, u.pathname);
  }
  if (isNonNil(u.search) && u.search !== '') {
    s += '?' + u.search;
  }
  if (isNonNil(u.hash) && u.hash !== '') {
    s += '#' + u.hash;
  }
  return s;
};

const originURL = Object.freeze(
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  parseURL(window?.location?.origin) ?? new URL('http://localhost:8080'),
);

export const NavLinkClasses = Object.freeze({
  Matches: 'nuke__nav-link-matches',
} as const);

export type RouterCtx = {
  readonly url: URL;
  readonly base: string;
  readonly resolve: (path: NavTarget | string) => string;
  readonly navigate: (path: NavTarget | string, opts?: NavOptions) => void;
  readonly navLinkMatchesClassName: string;
};

const RouterContext = createContext<RouterCtx>(
  Object.freeze({
    url: originURL,
    base: '',
    resolve: (path: NavTarget | string) => resolvePath(path),
    navigate: () => {},
    navLinkMatchesClassName: NavLinkClasses.Matches,
  }),
);

export type RouteParams = {
  readonly [key: string]: string;
};

export type RouteCtx = {
  readonly prefix: string;
  readonly params: RouteParams;
  readonly rest: string;
  readonly resolve: (path: NavTarget | string) => string;
  readonly navigate: (path: NavTarget | string, opts?: NavOptions) => void;
};

const RouteContext = createContext<RouteCtx>(
  Object.freeze({
    prefix: '',
    params: Object.freeze({}),
    rest: '',
    resolve: (path: NavTarget | string) => resolvePath(path),
    navigate: () => {},
  }),
);

export type RouterProps = {
  readonly base?: string | undefined;
  readonly history?: HistoryAPI | undefined;
  readonly navLinkMatchesClassName?: string | undefined;
};

export const useRouter = (): RouterCtx => useContext(RouterContext);

export const useRoute = (): RouteCtx => useContext(RouteContext);

const defaultHistory = new BrowserHistory();

export const Router: FC<PropsWithChildren<RouterProps>> = ({
  base = '',
  history = defaultHistory,
  navLinkMatchesClassName = NavLinkClasses.Matches,
  children,
}) => {
  base = useMemo(() => toPathPrefix(base), [base]);

  const [href, setHref] = useState(() => history.url());
  const url = useMemo(() => {
    const u = parseURL(href);
    if (isNil(u)) {
      console.error(new Error(`Invalid router href: ${href}`));
      return originURL;
    }
    return Object.freeze(u);
  }, [href]);

  const resolve = useCallback(
    (path: NavTarget | string): string => resolvePath(path, base),
    [base],
  );

  const navigate = useCallback(
    (path: NavTarget | string, opts?: NavOptions) => {
      const u = parseURL(resolve(path), history.origin());
      if (isNil(u)) {
        return;
      }
      history.navigate(u.href, opts);
      startTransition(() => {
        setHref(u.href);
      });
    },
    [history, resolve, setHref],
  );

  useEffect(() => {
    const controller = new AbortController();
    history.onNavigate((u) => {
      startTransition(() => {
        setHref(u);
      });
    }, controller.signal);
    return () => {
      controller.abort();
    };
  }, [setHref, history]);

  const urlpathname = url.pathname;
  const rest = useMemo(() => {
    const pathname = toPathPrefix(urlpathname);
    if (isPathPrefix(pathname, base)) {
      return pathname.slice(base.length);
    }
    return undefined;
  }, [base, urlpathname]);

  const routerCtx = useMemo(
    () =>
      Object.freeze({
        url,
        base,
        resolve,
        navigate,
        navLinkMatchesClassName,
      }),
    [url, base, resolve, navigate, navLinkMatchesClassName],
  );

  const routeCtx = useMemo(
    () =>
      Object.freeze({
        prefix: base,
        params: Object.freeze({}),
        rest: rest ?? '',
        resolve,
        navigate,
      }),
    [base, rest, resolve, navigate],
  );

  if (isNil(rest)) {
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

const SEGMENT_PATTERN_REGEX = /^{(?<key>.*)}$/;

const compilePattern = (pattern: string): CompiledPatternSegment[] => {
  pattern = toPathPrefix(pattern);
  if (pattern === '') {
    return [];
  }
  const segments = pattern.slice(1).split('/');
  return segments.reduce<CompiledPatternSegment[]>((acc, v) => {
    const match = SEGMENT_PATTERN_REGEX.exec(v);
    const key = match?.groups?.['key'];
    if (isNil(key)) {
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

const compileRoute = ({
  path,
  exact = false,
  component,
}: Route): CompiledRoute => {
  return {
    match: compilePattern(path),
    exact,
    component,
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
      if (!isPathPrefix(rest, segment.match)) {
        return undefined;
      }
      rest = rest.slice(segment.match.length);
    } else {
      const idx = rest.indexOf('/');
      if (idx < 0) {
        if (segment.key !== '') {
          params[segment.key] = rest;
        }
        rest = '';
      } else {
        if (segment.key !== '') {
          params[segment.key] = rest.slice(0, idx);
        }
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
  readonly fallbackRedir?: string | undefined;
  readonly fallback?: JSX.Element | undefined;
};

export const Routes: FC<RoutesProps> = ({routes, fallbackRedir, fallback}) => {
  const {navigate: rootNavigate} = useRouter();
  const {prefix, params, rest, navigate} = useRoute();

  const compiledRoutes = useMemo(() => routes.map(compileRoute), [routes]);

  const match = useMemo(() => {
    for (const route of compiledRoutes) {
      const match = matchRoute(rest, route.match, route.exact);
      if (isNil(match)) {
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

  const routeNotFound = isNil(match);

  useEffect(() => {
    if (routeNotFound && isNonNil(fallbackRedir)) {
      navigate(fallbackRedir, {replace: true});
    }
  }, [routeNotFound, fallbackRedir, navigate]);

  const matchPrefix = match?.prefix;
  const subPrefix = useMemo(
    () => (isNonNil(matchPrefix) ? prefix + matchPrefix : ''),
    [prefix, matchPrefix],
  );

  const subResolve = useCallback(
    (path: NavTarget | string): string => resolvePath(path, subPrefix),
    [subPrefix],
  );

  const subNavigate = useCallback(
    (path: NavTarget | string) => {
      rootNavigate(subResolve(path));
    },
    [subResolve, rootNavigate],
  );

  const subRouteCtx = useMemo(
    () =>
      Object.freeze({
        prefix: subPrefix,
        params:
          Object.keys(match?.params ?? {}).length > 0
            ? Object.freeze(Object.assign({}, params, match?.params))
            : params,
        rest: match?.rest ?? '',
        resolve: subResolve,
        navigate: subNavigate,
      }),
    [subPrefix, params, match, subResolve, subNavigate],
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

export type NavLinkHook = {
  readonly href: string | undefined;
  readonly matches: boolean;
  readonly nav: () => void;
};

export const useNavLink = (
  path: NavTarget | string | undefined,
  exact: boolean,
): NavLinkHook => {
  const {url} = useRouter();
  const {resolve, navigate} = useRoute();

  const href = useMemo(
    () => (isNonNil(path) ? resolve(path) : undefined),
    [path, resolve],
  );

  const matches = useMemo(() => {
    if (isNil(href)) {
      return false;
    }
    const pathname = toAbsolutePath(url.pathname);
    const u = pathToNavTarget(href);
    if (exact) {
      return pathname === u.pathname;
    }
    return isPathPrefix(pathname, u.pathname);
  }, [href, url, exact]);

  const nav = useCallback(() => {
    if (isNil(path)) {
      return;
    }
    navigate(path);
  }, [path, navigate]);

  const res = useMemo(() => ({href, matches, nav}), [href, matches, nav]);
  return res;
};

export type NavLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  readonly href?: NavTarget | string | undefined;
  readonly matchesClassName?: string | undefined;
  readonly disabledClassName?: string | undefined;
  readonly matchesAriaCurrent?: AriaAttributes['aria-current'] | undefined;
  readonly matchesProps?: AnchorHTMLAttributes<HTMLAnchorElement> | undefined;
  readonly exact?: boolean | undefined;
};

export const NavLink = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NavLinkProps>
>(
  (
    {
      matchesClassName,
      matchesAriaCurrent = true,
      matchesProps,
      exact = false,
      className,
      href,
      'aria-current': ariaCurrent,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const {navLinkMatchesClassName} = useRouter();
    const {href: fullHref, matches, nav} = useNavLink(href, exact);
    const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
      (e) => {
        e.preventDefault();
        nav();
        if (isNonNil(onClick)) {
          onClick(e);
        }
      },
      [nav, onClick],
    );
    const mc = matchesClassName ?? navLinkMatchesClassName;
    const c = classNames(className, {
      [mc]: matches,
    });
    return (
      <a
        ref={ref}
        {...props}
        {...(matches ? matchesProps : {})}
        className={c}
        href={fullHref}
        aria-current={matches ? matchesAriaCurrent : ariaCurrent}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  },
);
