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
import "./Cards.scss";
import Card from "./Card";
import analytics from "../util/analytics";

function HeroSection(props) {
  const demoCardsProps = [
    { cardData: { value: "A", suit: "spades" } },
    { cardData: { value: "K", suit: "hearts" } },
    { cardData: { value: "10", suit: "clubs" } },
    { cardData: { value: "J", suit: "diamonds" } },
    { cardData: { value: "2", suit: "hearts" }, autoFlip: true },
    { cardData: { value: "A", suit: "hearts" } },
  ];

  const trackCardClick = (cardData, flipCard, isFlipped) => {
    analytics.track("heroCardClick");
    flipCard(!isFlipped);
  };
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
            {/* <>
              <Form onSubmit={props.formHandler} style={{ marginTop: "48px" }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Want a reminder to play this weekend?</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant={"outline-dark"} size="md" type="submit">
                  Remind me
                </Button>
              </Form>
            </> */}
          </Col>
          <Col className="offset-lg-1 mt-5 mt-lg-0 ">
            <figure className="HeroSection__image-container mx-auto">
              <div className="circle-container" style={{ zoom: ".8" }}>
                {demoCardsProps.map((renderProps) => (
                  <Card
                    key={`${renderProps.cardData.value}-${renderProps.cardData.suit}`}
                    cardData={renderProps.cardData}
                    autoFlip={renderProps.autoFlip}
                    cardClickHandler={trackCardClick}
                  ></Card>
                ))}
              </div>
            </figure>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default HeroSection;
