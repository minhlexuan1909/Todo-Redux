import "./Header.scss";

import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../features/auth/services/authThunk";
import { authTokenSelector } from "../../features/auth/services/authSlice";

const Header = ({ fullname }) => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const handleLogoutButtonClick = () => {
    dispatch(logoutThunk(token));
  };
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
              <NavDropdown title={`Hello, ${fullname}`} id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/login"
                  onClick={handleLogoutButtonClick}
                >
                  Logout
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
