import React from "react";
import AuthSection from "./../../components/AuthSection";
import { useRouter } from "next/router";

function AuthTypePage(props) {
  const router = useRouter();
  const { type } = router.query;

  return (
    <AuthSection
      bg="white"
      textColor="dark"
      size="md"
      bgImage=""
      bgImageOpacity={1}
      inputSize="lg"
      type={type}
      providers={["google", "facebook", "twitter"]}
      afterAuthPath="/dashboard"
    ></AuthSection>
  );
}

// Disable static prerendering
AuthTypePage.getInitialProps = async () => {
  return {};
};

export default AuthTypePage;
