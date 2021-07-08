import React, { useEffect } from "react";
import "./../styles/global.scss";
import NavbarCustom from "./../components/NavbarCustom";
import Footer from "./../components/Footer";
import "./../util/analytics.js";
import { ProvideAuth } from "./../util/auth.js";
import Head from "next/head";
import "../components/Global.scss";
import { Alert } from "react-bootstrap";
import Router from "next/router";
import * as Fathom from "fathom-client";
import { version } from "next/package.json";

// Record a pageview when route changes
Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

function App({ Component, pageProps }) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load("SUFURRMS", {
      url: "https://pinniped.quarantinecup.live/script.js",
    });
    Fathom.trackPageview();
  }, []);
  return (
    <ProvideAuth>
      <Head>
        <title>Quarantine Cup</title>
        <meta property="og:title" content="Quarantine Cup" />
        <meta property="og:description" content="A new, virtual King's cup." />
        <meta property="og:url" content="https://quarantinecup.live" />
        <meta
          property="og:image"
          content="https://quarantinecup.live/playing-cards.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dbredvick" />
        <meta
          name="twitter:image:alt"
          content="illustrated king and queen playing cards"
        />
      </Head>
      <>
        <NavbarCustom
          bg="white"
          variant="light"
          expand="md"
          logo="https://uploads.divjoy.com/logo.svg"
        ></NavbarCustom>

        <Component {...pageProps} />

        <Footer
          bg="light"
          textColor="dark"
          size="sm"
          bgImage=""
          bgImageOpacity={1}
          description="Quarantine games for all."
          copyright="© 2020 Drew Bredvick"
          logo="https://uploads.divjoy.com/logo.svg"
        ></Footer>
      </>
    </ProvideAuth>
  );
}
export default App;

export function reportWebVitals(metric) {
  const body = JSON.stringify({
    ...metric,
    apiKey: "abcd1234",
    nextVersion: version,
  });
  const url = "https://next-perf.now.sh/api/writeMetric";

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
}
