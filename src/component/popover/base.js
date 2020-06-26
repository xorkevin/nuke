import React, {Fragment, useState, useEffect, useCallback, useRef} from 'react';
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

const viewportPadding = 8;

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
  switch (position) {
    case 'top': {
      const distRight =
        s.left + popoverBounds.width / 2 + viewportPadding - viewBounds.width;
      if (distRight > 0) {
        s.left -= distRight;
      }
      const distLeft = s.left - popoverBounds.width / 2 - viewportPadding;
      if (distLeft < 0) {
        s.left -= distLeft;
      }
      const distBottom = s.top + viewportPadding - viewBounds.height;
      if (distBottom > 0) {
        s.top -= distBottom;
      }
      const distTop = s.top - popoverBounds.height - viewportPadding;
      if (distTop < 0) {
        s.top -= distTop;
      }
      break;
    }
    case 'left': {
      const distRight = s.left + viewportPadding - viewBounds.width;
      if (distRight > 0) {
        s.left -= distRight;
      }
      const distLeft = s.left - popoverBounds.width - viewportPadding;
      if (distLeft < 0) {
        s.left -= distLeft;
      }
      const distBottom =
        s.top + popoverBounds.height / 2 + viewportPadding - viewBounds.height;
      if (distBottom > 0) {
        s.top -= distBottom;
      }
      const distTop = s.top - popoverBounds.height / 2 - viewportPadding;
      if (distTop < 0) {
        s.top -= distTop;
      }
      break;
    }
    case 'right': {
      const distRight =
        s.left + popoverBounds.width + viewportPadding - viewBounds.width;
      if (distRight > 0) {
        s.left -= distRight;
      }
      const distLeft = s.left - viewportPadding;
      if (distLeft < 0) {
        s.left -= distLeft;
      }
      const distBottom =
        s.top + popoverBounds.height / 2 + viewportPadding - viewBounds.height;
      if (distBottom > 0) {
        s.top -= distBottom;
      }
      const distTop = s.top - popoverBounds.height / 2 - viewportPadding;
      if (distTop < 0) {
        s.top -= distTop;
      }
      break;
    }
    default: {
      const distRight =
        s.left + popoverBounds.width / 2 + viewportPadding - viewBounds.width;
      if (distRight > 0) {
        s.left -= distRight;
      }
      const distLeft = s.left - popoverBounds.width / 2 - viewportPadding;
      if (distLeft < 0) {
        s.left -= distLeft;
      }
      const distBottom =
        s.top + popoverBounds.height + viewportPadding - viewBounds.height;
      if (distBottom > 0) {
        s.top -= distBottom;
      }
      const distTop = s.top - viewportPadding;
      if (distTop < 0) {
        s.top -= distTop;
      }
    }
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
  const [anchorBounds, setAnchorBounds] = useState(null);
  const [popoverBounds, setPopoverBounds] = useState(null);
  const [viewBounds, setViewBounds] = useState(getViewBounds());
  const popoverRef = useCallback(
    (node) => {
      if (node !== null) {
        setPopoverBounds(node.getBoundingClientRect());
      } else {
        setPopoverBounds(null);
      }
    },
    [setPopoverBounds],
  );

  useEffect(() => {
    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          const ab = anchor.current
            ? anchor.current.getBoundingClientRect()
            : null;
          const vb = getViewBounds();
          setAnchorBounds(ab);
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
  }, [anchor, setAnchorBounds, setPopoverBounds, setViewBounds, close]);

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
      <div className={k.join(' ')} ref={popoverRef}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Popover;
