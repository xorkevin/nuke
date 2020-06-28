import React, {Fragment, useState, useCallback} from 'react';
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

const MenuItem = ({className, onClick, link, ext, icon, label, children}) => {
  let k = ['menu-item'];
  if (className) {
    k.push(className);
  }

  const row = (
    <Grid className="menu-item-row" strict align="center">
      <Column className="menu-item-icon">{icon}</Column>
      <Column className="menu-item-text">{children}</Column>
      <Column className="menu-item-right">{label}</Column>
    </Grid>
  );
  if (link) {
    return (
      <Anchor className={k.join(' ')} href={link} ext={ext}>
        {row}
      </Anchor>
    );
  }
  return (
    <Column className={k.join(' ')} onClick={onClick}>
      {row}
    </Column>
  );
};

const menuSizeSet = new Set(['sm', 'md', 'lg']);

const Menu = ({className, size, position, target, children}) => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const setHidden = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const toggleVisible = useCallback(
    (e) => {
      console.log('clicked');
      setShow((v) => !v);
    },
    [setShow],
  );

  const k = ['menu'];
  if (menuSizeSet.has(size)) {
    k.push(size);
  }
  if (className) {
    k.push(className);
  }

  return (
    <Fragment>
      <div className="menu-target" onClick={toggleVisible} ref={anchorRef}>
        {target}
      </div>
      {show && (
        <Popover
          anchor={anchor}
          className={k.join(' ')}
          position={position}
          close={setHidden}
        >
          <Grid className="menu-items" strict nowrap direction="column">
            {children}
          </Grid>
        </Popover>
      )}
    </Fragment>
  );
};

export {Menu as default, Menu, MenuItem, MenuHeader, MenuDivider};
