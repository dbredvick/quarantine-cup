import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./../util/auth.js";

function NavbarCustom(props) {
  const auth = useAuth();

  return (
    <Navbar bg={props.bg} variant={props.variant} expand={props.expand}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            {/* <img
              className="d-inline-block align-top"
              src={props.logo}
              alt="Logo"
              height="30"
            ></img> */}
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0"
        ></Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {auth.user && (
              <NavDropdown id="dropdown" title="Account" alignRight={true}>
                <Link href="/game?action=new" passHref>
                  <NavDropdown.Item active={false}>New game</NavDropdown.Item>
                </Link>
                <Link href="/game?action=join" passHref>
                  <NavDropdown.Item active={false}>Join game</NavDropdown.Item>
                </Link>

                {/* <Link href="/settings" passHref>
                  <NavDropdown.Item active={false}>Settings</NavDropdown.Item>
                </Link> */}

                <Dropdown.Divider></Dropdown.Divider>

                <Link href="/auth/signout" passHref>
                  <NavDropdown.Item
                    active={false}
                    onClick={(e) => {
                      e.preventDefault();
                      auth.signout();
                    }}
                  >
                    Sign out
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            )}

            {!auth.user && (
              <Nav.Item>
                <Link href="/auth/signin" passHref>
                  <Nav.Link active={false}>Sign in</Nav.Link>
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
