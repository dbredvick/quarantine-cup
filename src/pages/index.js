import React from "react";
import HeroSection from "./../components/HeroSection";
import ClientsSection from "./../components/ClientsSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import { useRouter } from "next/router";

function IndexPage(props) {
  const router = useRouter();

  return (
    <>
      <HeroSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Quarantine Cup"
        subtitle="King's cup, but remote-first."
        buttonText="New game"
        buttonColor="primary"
        secondButtonText="Join game"
        image="/drinking.svg"
        buttonOnClick={() => {
          // Navigate to pricing page
          router.push({
            pathname: "/game",
            query: { action: "new" },
          });
        }}
        secondButtonOnClick={() => {
          // Navigate to pricing page
          router.push({
            pathname: "/game",
            query: { action: "join" },
          });
        }}
      ></HeroSection>
      {/* <ClientsSection
        bg="light"
        textColor="dark"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        title=""
        subtitle=""
      ></ClientsSection> */}
      <FeaturesSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="The Rules"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      ></FeaturesSection>
      {/* <TestimonialsSection
        bg="light"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      ></TestimonialsSection> */}
      {/* <NewsletterSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        buttonColor="primary"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      ></NewsletterSection> */}
    </>
  );
}

// Disable static prerendering
IndexPage.getInitialProps = async () => {
  return {};
};

export default IndexPage;
