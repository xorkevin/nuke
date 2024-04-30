import {
  type AriaAttributes,
  type ForwardedRef,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  classNames,
  mergeRefs,
  modClassNames,
  modClassNamesObj,
} from '#internal/computil/index.js';
import {NavLink, type NavLinkProps} from '#internal/router/index.js';

import styles from './styles.module.css';

export const NavClasses = Object.freeze(
  modClassNamesObj(styles, {
    Banner: 'nav-banner',
    BannerItem: 'nav-banner-item',
    Sidebar: 'nav-sidebar',
  } as const),
);

export type NavCtx = {
  readonly matchesAriaCurrent: AriaAttributes['aria-current'];
  readonly level: number;
};

const NavContext = createContext<NavCtx>(
  Object.freeze({
    matchesAriaCurrent: true,
    level: 0,
  }),
);

export type NavBarProps = HTMLAttributes<HTMLElement> & {
  readonly matchesAriaCurrent?: AriaAttributes['aria-current'];
  readonly listRef?: ForwardedRef<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavBarLinkProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly href?: string | undefined;
  readonly exact?: boolean | undefined;
  readonly navLinkRef?: ForwardedRef<HTMLAnchorElement> | undefined;
  readonly navLinkProps?: NavLinkProps | undefined;
};

export type NavBarDividerProps = LiHTMLAttributes<HTMLLIElement>;

export const NavBar = Object.freeze(
  Object.assign(
    forwardRef<HTMLElement, PropsWithChildren<NavBarProps>>(
      (
        {
          matchesAriaCurrent = true,
          listRef,
          listProps,
          className,
          children,
          ...props
        },
        ref,
      ) => {
        const localRef = useRef<HTMLUListElement>(null);
        const mergedListRef = useMemo(
          () => mergeRefs(listRef, localRef),
          [listRef, localRef],
        );

        const navCtx = useMemo(
          () =>
            Object.freeze({
              matchesAriaCurrent,
              level: 0,
            }),
          [matchesAriaCurrent],
        );

        const c = classNames(modClassNames(styles, 'nav-bar'), className);

        return (
          <NavContext.Provider value={navCtx}>
            <nav ref={ref} {...props} className={c}>
              <ul ref={mergedListRef} {...listProps}>
                {children}
              </ul>
            </nav>
          </NavContext.Provider>
        );
      },
    ),
    {
      Link: forwardRef<HTMLLIElement, PropsWithChildren<NavBarLinkProps>>(
        ({href, exact, navLinkRef, navLinkProps, children, ...props}, ref) => {
          const localRef = useRef<HTMLLIElement>(null);
          const mergedRef = useMemo(
            () => mergeRefs(ref, localRef),
            [ref, localRef],
          );

          const {matchesAriaCurrent} = useContext(NavContext);

          const lc = classNames(
            modClassNames(styles, 'nav-bar-item'),
            navLinkProps?.className,
          );

          return (
            <li ref={mergedRef} {...props}>
              <NavLink
                ref={navLinkRef}
                {...navLinkProps}
                matchesAriaCurrent={matchesAriaCurrent}
                exact={exact}
                className={lc}
                href={href}
              >
                {children}
              </NavLink>
            </li>
          );
        },
      ),
      Divider: forwardRef<HTMLLIElement, PropsWithChildren<NavBarDividerProps>>(
        ({className, ...props}, ref) => {
          const localRef = useRef<HTMLLIElement>(null);
          const mergedRef = useMemo(
            () => mergeRefs(ref, localRef),
            [ref, localRef],
          );

          const c = classNames(
            modClassNames(styles, 'nav-bar-divider'),
            className,
          );

          return (
            <li ref={mergedRef} {...props} className={c} aria-hidden={true} />
          );
        },
      ),
    },
  ),
);

export type NavListProps = HTMLAttributes<HTMLElement> & {
  readonly matchesAriaCurrent?: AriaAttributes['aria-current'];
  readonly listRef?: ForwardedRef<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavListLinkProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly href?: string | undefined;
  readonly exact?: boolean | undefined;
  readonly navLinkRef?: ForwardedRef<HTMLAnchorElement> | undefined;
  readonly navLinkProps?: NavLinkProps | undefined;
};

export type NavListGroupProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly heading: ReactNode;
  readonly listRef?: ForwardedRef<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavListDividerProps = LiHTMLAttributes<HTMLLIElement>;

export type NavListSubNavProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly heading: ReactNode;
  readonly listRef?: ForwardedRef<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

const ChevronDown = () => (
  <svg
    className={styles['nav-list-chevron-icon']}
    aria-hidden={true}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    fill="none"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const NavList = Object.freeze(
  Object.assign(
    forwardRef<HTMLElement, PropsWithChildren<NavListProps>>(
      (
        {
          matchesAriaCurrent = true,
          listRef,
          listProps,
          className,
          children,
          ...props
        },
        ref,
      ) => {
        const navCtx = useMemo(
          () =>
            Object.freeze({
              matchesAriaCurrent,
              level: 0,
            }),
          [matchesAriaCurrent],
        );
        const c = classNames(modClassNames(styles, 'nav-list'), className);
        return (
          <NavContext.Provider value={navCtx}>
            <nav ref={ref} {...props} className={c}>
              <ul ref={listRef} {...listProps}>
                {children}
              </ul>
            </nav>
          </NavContext.Provider>
        );
      },
    ),
    {
      Link: forwardRef<HTMLLIElement, PropsWithChildren<NavListLinkProps>>(
        ({href, exact, navLinkRef, navLinkProps, children, ...props}, ref) => {
          const {matchesAriaCurrent} = useContext(NavContext);
          const c = classNames(
            modClassNames(styles, 'nav-list-item'),
            navLinkProps?.className,
          );
          return (
            <li ref={ref} {...props}>
              <NavLink
                ref={navLinkRef}
                {...navLinkProps}
                matchesAriaCurrent={matchesAriaCurrent}
                exact={exact}
                className={c}
                href={href}
              >
                {children}
              </NavLink>
            </li>
          );
        },
      ),
      Group: forwardRef<HTMLLIElement, PropsWithChildren<NavListGroupProps>>(
        ({heading, listRef, listProps, className, children, ...props}, ref) => {
          const id = useId();
          const c = classNames(
            modClassNames(styles, 'nav-list', 'nav-list-group'),
            className,
          );
          return (
            <li ref={ref} {...props} className={c} aria-labelledby={id}>
              <div id={id} className={styles['nav-list-heading']}>
                {heading}
              </div>
              <ul ref={listRef} {...listProps}>
                {children}
              </ul>
            </li>
          );
        },
      ),
      Divider: forwardRef<HTMLLIElement, NavListDividerProps>(
        ({className, ...props}, ref) => {
          const c = classNames(
            modClassNames(styles, 'nav-list-divider'),
            className,
          );
          return <li ref={ref} {...props} className={c} aria-hidden={true} />;
        },
      ),
      SubNav: forwardRef<HTMLLIElement, PropsWithChildren<NavListSubNavProps>>(
        ({heading, listRef, listProps, className, children, ...props}, ref) => {
          const navCtx = useContext(NavContext);
          const childNavCtx = useMemo(
            () => ({
              ...navCtx,
              level: navCtx.level + 1,
            }),
            [navCtx],
          );

          const id = useId();
          const idControl = `${id}-c`;
          const idList = `${id}-l`;

          const [open, setOpen] = useState(true);
          const c = classNames(
            modClassNames(styles, 'nav-list', 'nav-list-subnav', {
              'nav-list-subnav-collapsed': !open,
            }),
            className,
          );
          const toggleOpen = useCallback(() => {
            setOpen((v) => !v);
          }, [setOpen]);

          const childNavCtxLevel = childNavCtx.level;
          const listPropsStyle = listProps?.style;
          const s = useMemo(
            () =>
              Object.assign(
                {'--nuke-nav-list-nest-level': childNavCtxLevel},
                listPropsStyle,
              ),
            [childNavCtxLevel, listPropsStyle],
          );

          return (
            <li ref={ref} {...props} className={c} aria-labelledby={idControl}>
              <button
                id={idControl}
                className={styles['nav-list-expand']}
                onClick={toggleOpen}
                aria-expanded={open}
                aria-controls={idList}
              >
                {heading}
                <ChevronDown />
              </button>
              <NavContext.Provider value={childNavCtx}>
                <ul ref={listRef} {...listProps} id={idList} style={s}>
                  {children}
                </ul>
              </NavContext.Provider>
            </li>
          );
        },
      ),
    },
  ),
);
