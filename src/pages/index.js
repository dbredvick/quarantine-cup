import React from "react";
import HeroSection from "./../components/HeroSection";
import ClientsSection from "./../components/ClientsSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import CardSection from "./../components/CardSection";
import { useRouter } from "next/router";
import { apiRequest } from "../util/util";

function IndexPage(props) {
  const router = useRouter();

  const isWorking = router.query.name === "sam";

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
        buttonText={isWorking ? "New game" : "Sign up"}
        isWorking={isWorking}
        buttonColor="red"
        secondButtonText="Join game"
        image="/playing-cards.svg"
        buttonOnClick={() => {
          // Navigate to pricing page
          if (isWorking) {
            router.push({
              pathname: "/game",
              query: { action: "new" },
            });
          }
        }}
        secondButtonOnClick={() => {
          // Navigate to pricing page
          router.push({
            pathname: "/game",
            query: { action: "join" },
          });
        }}
        formHandler={async (e) => {
          // Navigate to pricing page
          e.preventDefault();
          const email = event.target.elements.formBasicEmail.value;
          encodeURIComponent;
          const resp = await fetch(
            `/api/newsletter?email=${encodeURIComponent(email)}`
          );
          console.log(resp);
          window.alert(
            `We sent a confirmation email to ${email}. Thanks for signing up!`
          );
        }}
      ></HeroSection>
      {/* <CardSection></CardSection> */}
      {/* <ClientsSection
        bg="light"
        textColor="dark"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        title=""
        subtitle=""
      ></ClientsSection> */}
      {isWorking && (
        <FeaturesSection
          bg="white"
          textColor="dark"
          size="md"
          bgImage=""
          bgImageOpacity={1}
          title="The Game"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
        ></FeaturesSection>
      )}
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
        buttonColor="red"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      ></NewsletterSection> */}
    </>
  );
}

// Disable static prerendering
export const getStaticProps = async () => {
  return {};
};

export default IndexPage;
