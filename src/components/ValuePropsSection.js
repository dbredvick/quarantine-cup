import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Features from "./Features";

function ValuePropsSection(props) {
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
        <Features
          items={[
            {
              title: "Just like King's Cup, but remote",
              description:
                "We made a virtual version of King's Cup so you can party on while in quarantine",
              image: "/video-call.svg",
            },
            {
              title: "Unlimited players",
              description: `We don't limit the number of players in a game or number of games played.`,
              image: "/room.svg",
            },
            {
              title: "Free to play",
              description: `We're not charging anything up front. At the end of the game there's an option to buy me a beer if you're feeling generous 🍻`,
              image: "/money.svg",
            },
          ]}
        ></Features>
      </Container>
    </Section>
  );
}

export default ValuePropsSection;
