import React, {useMemo} from 'react';
import Container from '../container';
import {Grid, Column} from '../grid';
import Anchor from '../anchor';

const TabItem = ({
  className,
  local,
  ext,
  link,
  scroll,
  onClick,
  forwardedRef,
  children,
}) => {
  const clickHandler = useMemo(() => {
    if (scroll) {
      return () => {
        if (typeof scroll === 'string') {
          const k = document.getElementById(scroll);
          if (k) {
            k.scrollIntoView({
              behavior: 'smooth',
            });
          }
        } else {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      };
    }
    return onClick;
  }, [scroll, onClick]);

  const k = ['tab-item'];
  if (className) {
    k.push(className);
  }

  if (link) {
    return (
      <Anchor
        forwardedRef={forwardedRef}
        className={k.join(' ')}
        local={local}
        ext={ext}
        href={link}
      >
        {children}
      </Anchor>
    );
  }
  return (
    <Column
      forwardedRef={forwardedRef}
      className={k.join(' ')}
      onClick={clickHandler}
    >
      {children}
    </Column>
  );
};

const TabDivider = ({className}) => {
  const k = ['tab-divider'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}></div>;
};

const Tabbar = ({className, children, right}) => {
  const k = ['tabbar'];
  if (className) {
    k.push(className);
  }
  return (
    <div className={k.join(' ')}>
      <Container className="tab-container">
        <Grid className="tab-elements" fill justify="space-between">
          <Column className="tab-element">
            <Grid className="tab-items" strict fill>
              {children}
            </Grid>
          </Column>
          <Column className="tab-element">
            <Grid className="tab-items" strict fill>
              {right}
            </Grid>
          </Column>
        </Grid>
      </Container>
    </div>
  );
};

export {Tabbar as default, Tabbar, TabItem, TabDivider};
