import React, {useMemo} from 'react';
import {Grid, Column} from '../grid';
import Anchor from '../anchor';

const SidebarDivider = ({className}) => {
  const k = ['sidebar-divider'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}></div>;
};

const SidebarHeader = ({className, children}) => {
  const k = ['sidebar-header'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}>{children}</div>;
};

const SidebarItem = ({
  className,
  link,
  ext,
  scroll,
  onClick,
  icon,
  label,
  forwardedRef,
  children,
}) => {
  const clickHandler = useMemo(() => {
    if (scroll) {
      return () => {
        const k = document.getElementById(scroll);
        if (k) {
          k.scrollIntoView({
            behavior: 'smooth',
          });
        }
      };
    }
    return onClick;
  }, [scroll, onClick]);

  const k = ['sidebar-item'];
  if (className) {
    k.push(className);
  }

  const row = (
    <Grid className="sidebar-item-row" strict align="center">
      <Column className="sidebar-item-icon">{icon}</Column>
      <Column className="sidebar-item-text">{children}</Column>
      <Column className="sidebar-item-right">{label}</Column>
    </Grid>
  );
  if (link) {
    return (
      <Anchor
        forwardedRef={forwardedRef}
        className={k.join(' ')}
        href={link}
        ext={ext}
      >
        {row}
      </Anchor>
    );
  }
  return (
    <Column
      forwardedRef={forwardedRef}
      className={k.join(' ')}
      onClick={clickHandler}
    >
      {row}
    </Column>
  );
};

const Sidebar = ({className, children}) => {
  const k = ['sidebar'];
  if (className) {
    k.push(className);
  }
  return (
    <div className={k.join(' ')}>
      <Grid className="sidebar-items" strict nowrap direction="column">
        {children}
      </Grid>
    </div>
  );
};

export {
  Sidebar as default,
  Sidebar,
  SidebarItem,
  SidebarHeader,
  SidebarDivider,
};
