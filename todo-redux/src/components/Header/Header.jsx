import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/dashboard">TodoList</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="main-nav">
                <Nav.Link href="/dashboard">List Todo</Nav.Link>
                <Nav.Link href="/dashboard">Create Todo</Nav.Link>
              </div>
              <NavDropdown title={`Hello, Minh`} id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/profile">
                  Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
