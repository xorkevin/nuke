import React from 'react';
import Container from 'component/container';

const Footer = ({className, children}) => {
  return (
    <footer className={className}>
      <Container padded narrow>
        {children}
      </Container>
    </footer>
  );
};

export default Footer;
