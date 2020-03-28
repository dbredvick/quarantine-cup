import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Pricing from "./Pricing";

function PricingSection(props) {
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
        <Pricing
          buttonText="Choose"
          onChoosePlan={planId => {
            // Add your own payments logic here
            alert(`You chose the plan "${planId}"`);
          }}
          items={[
            {
              id: "starter",
              name: "Starter",
              price: "10",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam."
            },
            {
              id: "plus",
              name: "Plus",
              price: "20",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam."
            },
            {
              id: "pro",
              name: "Pro",
              price: "40",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam."
            }
          ]}
        ></Pricing>
      </Container>
    </Section>
  );
}

export default PricingSection;
