import {NavLink} from 'react-router-dom';

const Anchor = ({className, local, ext, href, forwardedRef, children}) => {
  if (local) {
    return (
      <NavLink ref={forwardedRef} className={className} to={href}>
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
