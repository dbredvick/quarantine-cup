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
      router.push("/auth/signin");
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

// Disable static prerendering
SettingsPage.getInitialProps = async () => {
  return {};
};

export default SettingsPage;
