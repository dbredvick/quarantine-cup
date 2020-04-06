import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import "./Footer.scss";

function Footer(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      style={{ marginTop: "100px" }}
    >
      <Container>
        <div className="FooterComponent__inner">
          <div className="brand left">
            {/* <Link href="/">
              <a>
                <img src={props.logo} alt="Logo"></img>
              </a>
            </Link> */}
          </div>
          <div className="links right">
            {/* <Link href="/about">
              <a>About</a>
            </Link>

            <Link href="/faq">
              <a>FAQ</a>
            </Link>

            <Link href="/contact">
              <a>Contact</a>
            </Link> */}

            <a target="_blank" href="https://drew.tech">
              Blog
            </a>
          </div>
          <div className="social right">
            <a
              href="https://twitter.com/dbredvick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <i className="fab fa-twitter"></i>
              </span>
            </a>
            <a
              href="https://instagram.com/drewbredvick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <i className="fab fa-instagram"></i>
              </span>
            </a>
          </div>
          <div className="copyright left">{props.copyright}</div>
        </div>
      </Container>
    </Section>
  );
}

export default Footer;
