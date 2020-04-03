import React from "react";
import "./../styles/global.scss";
import NavbarCustom from "./../components/NavbarCustom";
import Footer from "./../components/Footer";
import App from "next/app";
import "./../util/analytics.js";
import { ProvideAuth } from "./../util/auth.js";

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
