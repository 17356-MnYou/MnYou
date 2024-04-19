import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  return (
    <Navbar className="custom-navbar bg-body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="60"
            height="60"
            className="d-inline-block align-top custom-logo"
            alt="MnYou logo"
          />
        </Navbar.Brand>
      </Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/customer">Customer</Nav.Link>
            <Nav.Link href="/restaurant">Restaurant</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;