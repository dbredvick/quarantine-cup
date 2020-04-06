import React from "react";
import "./../styles/global.scss";
import NavbarCustom from "./../components/NavbarCustom";
import Footer from "./../components/Footer";
import App from "next/app";
import "./../util/analytics.js";
import { ProvideAuth } from "./../util/auth.js";
import Head from "next/head";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ProvideAuth>
        <Head>
          <title>Quarantine Cup</title>
          <meta property="og:title" content="Quarantine Cup" />
          <meta
            property="og:description"
            content="A new, virtual King's cup."
          />
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
}

export default MyApp;
