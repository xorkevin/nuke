import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const preventDefault = (e) => {
  e.preventDefault();
};

const getViewBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const Popover = ({className, position, anchor, close, children}) => {
  const [bounds, setBounds] = useState(
    anchor.current
      ? anchor.current.getBoundingClientRect()
      : {
          width: 0,
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        },
  );
  const [viewBounds, setViewBounds] = useState(getViewBounds());

  useEffect(() => {
    if (!anchor.current) {
      return;
    }

    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          setBounds(anchor.current.getBoundingClientRect());
          setViewBounds(getViewBounds());
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
  }, [anchor, close, setBounds, setViewBounds]);

  const k = ['popover-root'];
  let top = 0;
  let left = 0;
  if (position === 'top') {
    k.push('top');
    top = bounds.top;
    left = bounds.left + bounds.width / 2;
  } else if (position === 'left') {
    k.push('left');
    top = bounds.top + bounds.height / 2;
    left = bounds.left;
  } else if (position === 'right') {
    k.push('right');
    top = bounds.top + bounds.height / 2;
    left = bounds.right;
  } else {
    k.push('bottom');
    top = bounds.bottom;
    left = bounds.left + bounds.width / 2;
  }

  return ReactDOM.createPortal(
    <div className={k.join(' ')} style={{top, left}}>
      <div className="popover">{children}</div>
      <div className="triangle" />
    </div>,
    document.body,
  );
};

export default Popover;
