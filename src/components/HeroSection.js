import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "./SectionHeader";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  Form,
  FormInput,
  FormGroup,
  FormText,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import "./HeroSection.scss";

function HeroSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="text-center text-lg-left">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={1}
              spaced={true}
            ></SectionHeader>
            {props.isWorking ? (
              <>
                <Button
                  variant={props.buttonColor}
                  size="lg"
                  onClick={props.buttonOnClick}
                >
                  {props.buttonText}
                </Button>
                <Button
                  variant={props.buttonColor}
                  size="lg"
                  style={{ marginLeft: "12px" }}
                  onClick={props.secondButtonOnClick}
                >
                  {props.secondButtonText}
                </Button>
              </>
            ) : (
              <>
                <Form onSubmit={props.formHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Join our waitlist</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button
                    onClick={props.buttonOnClick}
                    variant={props.buttonColor}
                    size="lg"
                    type="submit"
                  >
                    {props.buttonText}
                  </Button>
                </Form>
              </>
            )}
          </Col>
          <Col className="offset-lg-1 mt-5 mt-lg-0 ">
            <figure className="HeroSection__image-container mx-auto">
              <Image src={props.image} fluid={true}></Image>
            </figure>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default HeroSection;
