import React from "react";
import Nav from "react-bootstrap/Nav";

function SettingsNav(props) {
  return (
    <Nav variant="pills" {...props}>
      <Nav.Item>
        <Nav.Link eventKey="general">General</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="password">Password</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default SettingsNav;
