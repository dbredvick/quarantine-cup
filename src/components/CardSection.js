import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Card from "./Card";
import "./Cards.scss";

function CardSection(props) {
  const cardData = { value: "A", suit: "spades" };
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
          className="text-center"
        ></SectionHeader>
        <div className="card-hand">
          <Card
            style={{ transform: "rotate(20deg)", overflow: "hidden" }}
            cardData={cardData}
          ></Card>
          <Card cardData={cardData}></Card>
          <Card cardData={cardData}></Card>
        </div>
      </Container>
    </Section>
  );
}

export default CardSection;
