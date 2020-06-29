import React, {useState, useEffect, useMemo} from 'react';
import Container from '../container';
import {Grid, Column} from '../grid';

const scrollTime = 384;
const scrollTimeSqrt = Math.sqrt(scrollTime);
const navHeight = 64;
const scrollDistanceCap = 4096;

const easing = (t) => {
  if (t < 0.5) {
    return 4 * t * t * t;
  } else {
    return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
};

const scrollTo = (element) => {
  const startingY = window.pageYOffset;
  let elementY = 0;
  if (typeof element === 'string') {
    elementY =
      window.scrollY +
      document.getElementById(element).getBoundingClientRect().top;
  }
  let targetY = elementY - navHeight;
  if (targetY < 0) {
    targetY = 0;
  }
  const scrollHeight = document.body.scrollHeight;
  const innerHeight = window.innerHeight;
  if (scrollHeight - elementY < innerHeight) {
    targetY = scrollHeight - innerHeight;
  }
  const diff = targetY - startingY;
  let start;
  if (!diff) {
    return;
  }
  const duration = Math.min(
    Math.sqrt((Math.abs(diff) * scrollTime) / scrollDistanceCap) *
      scrollTimeSqrt,
    scrollTime,
  );
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const time = timestamp - start;
    window.scrollTo(0, startingY + diff * easing(Math.min(time / duration, 1)));
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

const NavItem = ({onClick, forwardedRef, children}) => {
  return (
    <Column forwardedRef={forwardedRef} className="nav-item" onClick={onClick}>
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

export {Navbar as default, Navbar, NavItem};
