import React, {Fragment, useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

const preventDefault = (e) => {
  e.preventDefault();
};

const getViewBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const positionSet = new Set(['top', 'left', 'right', 'bottom']);

const calcDefaultLocation = (position, padding, anchorBounds) => {
  switch (position) {
    case 'top':
      return {
        top: anchorBounds.top - padding,
        left: anchorBounds.left + anchorBounds.width / 2,
      };
    case 'left':
      return {
        top: anchorBounds.top + anchorBounds.height / 2,
        left: anchorBounds.left - padding,
      };
    case 'right':
      return {
        top: anchorBounds.top + anchorBounds.height / 2,
        left: anchorBounds.right + padding,
      };
    default:
      return {
        top: anchorBounds.bottom + padding,
        left: anchorBounds.left + anchorBounds.width / 2,
      };
  }
};

const calcLocationStyle = (
  position,
  padding,
  anchorBounds,
  popoverBounds,
  viewBounds,
) => {
  const s = calcDefaultLocation(position, padding, anchorBounds);
  if (!popoverBounds) {
    return s;
  }
  return s;
};

const Popover = ({
  className,
  position,
  padding = 8,
  close,
  anchor,
  children,
}) => {
  const popover = useRef(null);
  const [anchorBounds, setAnchorBounds] = useState(null);
  const [popoverBounds, setPopoverBounds] = useState(null);
  const [viewBounds, setViewBounds] = useState(getViewBounds());

  useEffect(() => {
    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          const ab = anchor.current
            ? anchor.current.getBoundingClientRect()
            : null;
          const pb = popover.current
            ? popover.current.getBoundingClientRect()
            : null;
          const vb = getViewBounds();
          setAnchorBounds(ab);
          setPopoverBounds(pb);
          setViewBounds(vb);
          running = null;
        });
      }
    };
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler);
    if (close) {
      window.addEventListener('click', close);
    }
    handler();
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
      if (close) {
        window.removeEventListener('click', close);
      }
      if (running) {
        window.cancelAnimationFrame(running);
      }
    };
  }, [
    anchor,
    popover,
    setAnchorBounds,
    setPopoverBounds,
    setViewBounds,
    close,
  ]);

  if (!anchorBounds) {
    return null;
  }

  const k = ['popover'];
  if (positionSet.has(position)) {
    k.push(position);
  } else {
    k.push('bottom');
  }
  if (className) {
    k.push(className);
  }
  const s = calcLocationStyle(
    position,
    padding,
    anchorBounds,
    popoverBounds,
    viewBounds,
  );
  return ReactDOM.createPortal(
    <div className="popover-root" style={s}>
      <div className={k.join(' ')}>{children}</div>
    </div>,
    document.body,
  );
};

export default Popover;
