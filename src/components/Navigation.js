import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect fixed="top">
      {" "}
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Genshin Helper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/element">
              Ele Gems
            </Nav.Link>
            <Nav.Link as={Link} to="/weapon">
              Weapon Calculator
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/preferences">
              Preferences
            </Nav.Link>
            <Nav.Link as={Link} to="/characters">
              Characters
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
