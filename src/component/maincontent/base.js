import React from 'react';

const MainContent = ({className, withNavbar, children}) => {
  const k = [];
  if (withNavbar) {
    k.push('with-navbar');
  }
  if (className) {
    k.push(className);
  }

  return <main className={k.join(' ')}>{children}</main>;
};

export default MainContent;
