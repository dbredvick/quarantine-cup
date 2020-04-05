import React, { useEffect } from "react";
import DashboardSection from "./../components/DashboardSection";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "next/router";

function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();

  // Redirect to signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );
      // might need to change this to just the path not the window location
      router.push(`/auth/signin?redirect=${redirectTo}`);
    }
  }, [auth, router]);

  return (
    <DashboardSection
      bg="white"
      textColor="dark"
      size="md"
      bgImage=""
      bgImageOpacity={1}
      title="Dashboard"
      subtitle="Dashboard components are coming to the Divjoy library soon. For now, you can implement a custom dashboard here after exporting your code."
    ></DashboardSection>
  );
}

// Disable static prerendering
DashboardPage.getInitialProps = async () => {
  return {};
};

export default DashboardPage;
