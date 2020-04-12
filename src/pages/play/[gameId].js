import React, { useEffect } from "react";
import { useAuth } from "../../util/auth";
import { useRouter } from "next/router";
import PlayGameSection from "../../components/PlayGameSection.js";
import Head from "next/head";

export default function Play() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );
      // might need to change this to just the path not the window location
      router.push(`/auth/signin?redirect=${redirectTo}`);
    }
  }, [auth, router]);

  useEffect(() => {
    const coffeeScript = document.createElement("script");

    coffeeScript.setAttribute("data-name", "BMC-Widget");
    coffeeScript.setAttribute("data-id", "drewbredvick");
    coffeeScript.setAttribute(
      "data-description",
      "Support my server costs & beer fund."
    );
    coffeeScript.setAttribute(
      "data-message",
      "Thanks for playing. Buy me a beer if you liked the game!"
    );
    coffeeScript.setAttribute("data-color", "#FF5F5F");
    coffeeScript.setAttribute("data-position", "right");
    coffeeScript.setAttribute("data-x_margin", "18");
    coffeeScript.setAttribute("data-y_margin", "18");

    document.head.appendChild(coffeeScript);
  }, []);

  return auth.user ? (
    <>
      <PlayGameSection gameId={router.query.gameId}></PlayGameSection>
    </>
  ) : (
    <>Loading ...</>
  );
}
