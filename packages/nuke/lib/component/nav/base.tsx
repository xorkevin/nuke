import {
  type HTMLAttributes,
  type LiHTMLAttributes,
  type PropsWithChildren,
  type Ref,
  forwardRef,
} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';
import {NavAnchor, type NavAnchorProps} from '#internal/router/router.js';

import styles from './styles.module.css';

export const NavClasses = Object.freeze({
  Banner: `${styles['nav-banner']}`,
} as const);

export type NavProps = HTMLAttributes<HTMLElement> & {
  readonly listRef?: Ref<HTMLUListElement> | undefined;
  readonly listProps?: HTMLAttributes<HTMLUListElement> | undefined;
};

export type NavBarLinkProps = LiHTMLAttributes<HTMLLIElement> & {
  readonly href?: string | undefined;
  readonly exact?: boolean | undefined;
  readonly navAnchorRef?: Ref<HTMLAnchorElement> | undefined;
  readonly navAnchorProps?: NavAnchorProps | undefined;
};

export const NavBar = Object.assign(
  forwardRef<HTMLElement, PropsWithChildren<NavProps>>(
    ({listRef, listProps, className, children, ...props}, ref) => {
      const c = classNames(modClassNames(styles, 'nav-bar'), className);
      return (
        <nav ref={ref} {...props} className={c}>
          <ul ref={listRef} {...listProps}>
            {children}
          </ul>
        </nav>
      );
    },
  ),
  {
    Link: forwardRef<HTMLLIElement, PropsWithChildren<NavBarLinkProps>>(
      (
        {href, exact, navAnchorRef, navAnchorProps, children, ...props},
        ref,
      ) => {
        return (
          <li ref={ref} {...props}>
            <NavAnchor
              ref={navAnchorRef}
              {...navAnchorProps}
              href={href}
              exact={exact}
            >
              {children}
            </NavAnchor>
          </li>
        );
      },
    ),
  },
);
