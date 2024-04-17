import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <span className="text-muted">© 2024 MnYou. All rights reserved.</span>
      </Container>
    </footer>
  );
};

export default Footer;