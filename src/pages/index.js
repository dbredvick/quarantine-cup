import React from "react";
import HeroSection from "./../components/HeroSection";
import ClientsSection from "./../components/ClientsSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import ValuePropsSection from "./../components/ValuePropsSection";
import CardSection from "./../components/CardSection";
import { useRouter } from "next/router";
import { apiRequest } from "../util/util";

function IndexPage(props) {
  const router = useRouter();

  const isWorking = true;

  return (
    <>
      <HeroSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Quarantine Cup"
        subtitle="King's Cup, but remote-first."
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
          await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`);
          window.alert(
            `We'll send you a reminder email this weekend at ${email}!`
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
      {true && (
        <ValuePropsSection
          bg="white"
          textColor="dark"
          size="md"
          bgImage=""
          bgImageOpacity={1}
          title="The best drinking game for remote groups."
          subtitle=""
        ></ValuePropsSection>
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
      {false && (
        <FeaturesSection
          bg="white"
          textColor="dark"
          size="md"
          bgImage=""
          bgImageOpacity={1}
          title="How to play"
          subtitle="Start playing Quarantine Cup with your friends with just a few clicks"
        ></FeaturesSection>
      )}

      <NewsletterSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Want a reminder to play this weekend?"
        subtitle="We'll email you a link and a getting started guide."
        buttonText="Remind me"
        buttonColor="red"
        inputPlaceholder="Enter your email"
        subscribedMessage="Check your inbox this Friday!"
      ></NewsletterSection>
    </>
  );
}

// Disable static prerendering
export const getStaticProps = async () => {
  return { props: {} };
};

export default IndexPage;
