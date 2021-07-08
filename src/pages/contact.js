import React from "react";
import ContactSection from "./../components/ContactSection";

function ContactPage(props) {
  return (
    <ContactSection
      bg="white"
      textColor="dark"
      size="md"
      bgImage=""
      bgImageOpacity={1}
      title="Contact Us"
      subtitle=""
      buttonText="Send message"
      buttonColor="red"
      showNameField={true}
      inputSize="md"
    ></ContactSection>
  );
}

export const getStaticProps = () => ({ props: {} });

export default ContactPage;
