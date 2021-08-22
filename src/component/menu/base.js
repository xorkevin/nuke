import {useState, useCallback} from 'react';
import {Popover, useStateRef} from '../popover';
import {Grid, Column} from '../grid';
import Anchor from '../anchor';

const MenuDivider = ({className}) => {
  const k = ['menu-divider'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}></div>;
};

const MenuHeader = ({className, children}) => {
  const k = ['menu-header'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}>{children}</div>;
};

const MenuItem = ({
  className,
  onClick,
  local,
  ext,
  link,
  icon,
  label,
  forwardedRef,
  children,
}) => {
  const k = ['menu-item'];
  if (className) {
    k.push(className);
  }

  const row = (
    <Grid className="menu-item-row" nowrap strict align="center">
      <Column className="menu-item-icon" shrink="0">
        {icon}
      </Column>
      <Column className="menu-item-text">{children}</Column>
      <Column className="menu-item-right" shrink="0">
        {label}
      </Column>
    </Grid>
  );
  if (link) {
    return (
      <Anchor
        forwardedRef={forwardedRef}
        className={k.join(' ')}
        local={local}
        ext={ext}
        href={link}
      >
        {row}
      </Anchor>
    );
  }
  return (
    <Column
      forwardedRef={forwardedRef}
      className={k.join(' ')}
      onClick={onClick}
    >
      {row}
    </Column>
  );
};

const menuSizeSet = new Set(['sm', 'md', 'lg']);

const useMenu = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const close = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const toggle = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  return {
    anchor,
    anchorRef,
    show,
    setShow,
    close,
    toggle,
  };
};

const Menu = ({
  className,
  size,
  position,
  anchor,
  close,
  onClick,
  children,
}) => {
  const k = ['menu'];
  if (menuSizeSet.has(size)) {
    k.push(size);
  }
  if (className) {
    k.push(className);
  }

  return (
    <Popover
      anchor={anchor}
      className={k.join(' ')}
      position={position}
      close={close}
      onClick={onClick}
    >
      <Grid className="menu-items" strict nowrap direction="column">
        {children}
      </Grid>
    </Popover>
  );
};

export {Menu as default, useMenu, Menu, MenuItem, MenuHeader, MenuDivider};
