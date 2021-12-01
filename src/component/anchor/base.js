import {useCallback} from 'react';
import {NavLink} from 'react-router-dom';

const Anchor = ({className, local, ext, href, forwardedRef, children}) => {
  const anchorClassName = useCallback(
    ({isActive} = {}) => {
      const k = [];
      if (className) {
        k.push(className);
      }
      if (isActive) {
        k.push('active');
      }
      return k.join(' ');
    },
    [className],
  );

  if (local) {
    return (
      <NavLink ref={forwardedRef} className={anchorClassName} to={href}>
        {children}
      </NavLink>
    );
  }

  let k = {};
  if (ext) {
    k = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <a ref={forwardedRef} className={className} {...k} href={href}>
      {children}
    </a>
  );
};

export default Anchor;
