import React, {useState, useEffect, useMemo} from 'react';
import Container from '../container';
import {Grid, Column} from '../grid';

const useScrollTo = (id) => {
  return useCallback(() => {
    const k = document.getElementById(id);
    if (k) {
      k.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [id]);
};

const NavItem = ({onClick, scroll, forwardedRef, children}) => {
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
  return (
    <Column
      forwardedRef={forwardedRef}
      className="nav-item"
      onClick={clickHandler}
    >
      {children}
    </Column>
  );
};

const Navbar = ({
  className,
  fixed,
  topHeight = 256,
  scrollMargin = 8,
  hideOnScroll,
  children,
  right,
}) => {
  const [top, setTop] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    let position = window.pageYOffset;
    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          const nextPosition = window.pageYOffset;
          const diff = nextPosition - position;
          if (Math.abs(diff) > scrollMargin) {
            setScrollDown(diff > 0);
            position = nextPosition;
          }
          if (nextPosition < topHeight) {
            setTop(true);
          } else {
            setTop(false);
          }
          running = null;
        });
      }
    };
    handler();
    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      if (running) {
        window.cancelAnimationFrame(running);
      }
    };
  }, [topHeight, scrollMargin, setTop, setScrollDown]);

  const k = [];
  if (scrollDown) {
    k.push('scroll-down');
  }
  if (top) {
    k.push('top');
  } else {
    k.push('not-top');
  }
  if (hideOnScroll) {
    k.push('hide-on-scroll');
  }

  return (
    <nav className={k.join(' ')}>
      <Container className="nav-container" fill>
        <Grid className="nav-elements" strict fill justify="space-between">
          <Column className="element">
            <Grid className="nav-items" strict fill>
              {children}
            </Grid>
          </Column>
          <Column className="element">
            <Grid className="nav-items" strict fill>
              {right}
            </Grid>
          </Column>
        </Grid>
      </Container>
    </nav>
  );
};

export {Navbar as default, Navbar, NavItem, useScrollTo};
