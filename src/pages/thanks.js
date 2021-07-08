import React from "react";
import HeroSection2 from "../components/HeroSection2";

function ThanksPage(props) {
  return (
    <>
      <HeroSection2
        bg="primary"
        textColor="white"
        size="lg"
        bgImage=""
        bgImageOpacity={1}
        title="Thanks for confirming your email!"
        subtitle="We're building the beta version of the game right now. Watch your inbox for 'support@quickerquestions.live' when we're ready to have you join us."
      ></HeroSection2>
    </>
  );
}

export const getStaticProps = () => ({ props: {} });

export default ThanksPage;
