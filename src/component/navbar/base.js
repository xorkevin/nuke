import {useState, useEffect, useMemo} from 'react';
import Container from '../container';
import {Grid, Column} from '../grid';
import Anchor from '../anchor';

const NavItem = ({
  className,
  local,
  ext,
  link,
  onClick,
  scroll,
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

  const k = ['nav-item'];
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

const NavDivider = ({className}) => {
  const k = ['nav-divider'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}></div>;
};

const Navbar = ({
  className,
  fixed,
  hideOnScroll,
  topHeight = 256,
  scrollMargin = 8,
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
  if (fixed) {
    k.push('fixed');
  }
  if (hideOnScroll) {
    k.push('hide-on-scroll');
  }
  if (className) {
    k.push(className);
  }

  return (
    <nav className={k.join(' ')}>
      <Container className="nav-container" fill>
        <Grid className="nav-elements" fill justify="space-between">
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

export {Navbar as default, Navbar, NavItem, NavDivider};
