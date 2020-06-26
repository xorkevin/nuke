import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const preventDefault = (e) => {
  e.preventDefault();
};

const Popover = ({
  className,
  align,
  position,
  fixed,
  anchor,
  close,
  children,
}) => {
  const [bounds, setBounds] = useState(anchor.current.getBoundingClientRect());
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          setBounds(anchor.current.getBoundingClientRect());
          setScrollY(window.scrollY);
          running = null;
        });
      }
    };
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler);
    if (close) {
      window.addEventListener('click', close);
    }
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
  }, [anchor, close, setBounds, setScrollY]);

  const k = ['popover'];
  const s = {};
  const t = {
    left: bounds.width / 2,
  };
  if (align === 'right') {
    k.push('right');
    s.left = bounds.right;
    t.left *= -1;
  } else {
    k.push('left');
    s.left = bounds.left;
  }
  if (position === 'top') {
    k.push('top');
    s.top = bounds.top;
  } else {
    k.push('bottom');
    s.top = bounds.bottom;
  }
  if (fixed) {
    k.push('fixed');
  } else {
    s.top += scrollY;
  }

  return ReactDOM.createPortal(
    <div className={k.join(' ')} style={s}>
      <div className="popover-container">{children}</div>
      <div className="triangle" style={t} />
    </div>,
    document.body,
  );
};

export default Popover;
