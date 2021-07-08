import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./../util/auth.js";
import { Alert } from "react-bootstrap";
import * as Fathom from "fathom-client";

const calculateTimeLeft = () => {
  const difference = +new Date("2020-05-11") - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

function NavbarCustom(props) {
  const auth = useAuth();
  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span style={{ marginLeft: "2px" }}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const handleClick = () => {
    Fathom.trackGoal("MJLD6GCC", 0);
  };

  return (
    <>
      {show && (
        <Alert
          style={{ display: "flex", justifyContent: "center" }}
          dismissible
          onClose={() => setShow(false)}
          variant={"info"}
        >
          <span>
            🎉 Free to play during COVID-19.{" "}
            <Alert.Link onClick={handleClick} href="/auth/signup">
              Click here to create a free account
            </Alert.Link>
            . 🎉
          </span>
        </Alert>
      )}

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
                    <NavDropdown.Item active={false}>
                      Join game
                    </NavDropdown.Item>
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
    </>
  );
}

export default NavbarCustom;
