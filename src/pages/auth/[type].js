import React from "react";
import AuthSection from "./../../components/AuthSection";
import { useRouter } from "next/router";
import LogRocket from "logrocket";

function AuthTypePage(props) {
  const router = useRouter();
  const { type } = router.query;

  if (process.env.NODE_ENV === "production") {
    LogRocket.init("tsvmer/quarantinecup");
  }

  return (
    <AuthSection
      bg="white"
      textColor="dark"
      size="md"
      bgImage=""
      bgImageOpacity={1}
      inputSize="lg"
      type={type}
      providers={["google"]}
      afterAuthPath="/game"
    ></AuthSection>
  );
}

export const getStaticPaths = () => ({
  paths: [
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default AuthTypePage;
