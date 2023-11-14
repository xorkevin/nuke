import {
  type AriaAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';
import {NavLink, type NavLinkProps} from '#internal/router/router.js';

import styles from './styles.module.css';

export const NavClasses = Object.freeze({
  Banner: `${styles['nav-banner']}`,
  BannerItem: `${styles['nav-banner-item']}`,
  Sidebar: `${styles['nav-sidebar']}`,
} as const);

export type NavCtx = {
  readonly matchesAriaCurrent: AriaAttributes['aria-current'];
};

const NavContext = createContext<NavCtx>(
  Object.freeze({
    matchesAriaCurrent: true,
  }),
);

export type NavBarProps = HTMLAttributes<HTMLElement> & {
  readonly matchesAriaCurrent?: AriaAttributes['aria-current'];
  readonly listRef?: Ref<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavBarLinkProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly href?: string | undefined;
  readonly exact?: boolean | undefined;
  readonly navLinkRef?: Ref<HTMLAnchorElement> | undefined;
  readonly navLinkProps?: NavLinkProps | undefined;
};

export const NavBar = Object.assign(
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
      const navCtx = useMemo(
        () =>
          Object.freeze({
            matchesAriaCurrent,
          }),
        [matchesAriaCurrent],
      );
      const c = classNames(modClassNames(styles, 'nav-bar'), className);
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
    Link: forwardRef<HTMLLIElement, PropsWithChildren<NavBarLinkProps>>(
      ({href, exact, navLinkRef, navLinkProps, children, ...props}, ref) => {
        const {matchesAriaCurrent} = useContext(NavContext);
        const c = classNames(
          modClassNames(styles, 'nav-bar-item'),
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
  },
);

export type NavListProps = HTMLAttributes<HTMLElement> & {
  readonly matchesAriaCurrent?: AriaAttributes['aria-current'];
  readonly listRef?: Ref<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavListLinkProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly href?: string | undefined;
  readonly exact?: boolean | undefined;
  readonly navLinkRef?: Ref<HTMLAnchorElement> | undefined;
  readonly navLinkProps?: NavLinkProps | undefined;
};

export type NavListGroupProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly heading?: ReactNode;
  readonly listRef?: Ref<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavListDividerProps = LiHTMLAttributes<HTMLLIElement>;

export const NavList = Object.assign(
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
  },
  {
    Group: forwardRef<HTMLLIElement, PropsWithChildren<NavListGroupProps>>(
      ({heading, listRef, listProps, className, children, ...props}, ref) => {
        const c = classNames(
          modClassNames(styles, 'nav-list', 'nav-list-group'),
          className,
        );
        return (
          <li ref={ref} {...props} className={c}>
            {heading !== undefined && (
              <div className={styles['nav-list-heading']}>{heading}</div>
            )}
            <ul ref={listRef} {...listProps}>
              {children}
            </ul>
          </li>
        );
      },
    ),
  },
  {
    Divider: forwardRef<HTMLLIElement, NavListDividerProps>(
      ({className, ...props}, ref) => {
        const c = classNames(
          modClassNames(styles, 'nav-list-divider'),
          className,
        );
        return <li ref={ref} {...props} className={c} />;
      },
    ),
  },
);
