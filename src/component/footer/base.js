import Container from '../container';

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
