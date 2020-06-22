import React from 'react';

const Anchor = ({className, ext, href, children}) => {
  let k = {};
  if (ext) {
    k = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <a className={className} {...k} href={href}>
      {children}
    </a>
  );
};

export default Anchor;
