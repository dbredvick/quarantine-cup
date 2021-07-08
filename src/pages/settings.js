import React, { useEffect } from "react";
import SettingsSection from "./../components/SettingsSection";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "next/router";

function SettingsPage(props) {
  const auth = useAuth();
  const router = useRouter();

  // Redirect if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );

      router.push(`/auth/signin?redirect=${redirectTo}`);
    }
  }, [auth, router]);

  // Wait until we have user
  if (!auth.user) {
    return "Loading...";
  }

  return (
    <SettingsSection
      bg="white"
      textColor="dark"
      size="md"
      bgImage=""
      bgImageOpacity={1}
    ></SettingsSection>
  );
}

export const getStaticProps = async () => {
  return { props: {} };
};

export default SettingsPage;
