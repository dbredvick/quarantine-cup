import React, { useEffect } from "react";
import { useAuth } from "../../util/auth";
import { useRouter } from "next/router";
import PlayGameSection from "../../components/PlayGameSection.js";
import LogRocket from "logrocket";

export default function Play() {
  const auth = useAuth();
  const router = useRouter();

  if (process.env.NODE_ENV === "production") {
    LogRocket.init("tsvmer/quarantinecup");
  }

  useEffect(() => {
    if (auth.user === false) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );
      // might need to change this to just the path not the window location
      router.push(`/auth/signin?redirect=${redirectTo}`);
    }
  }, [auth, router]);

  return auth.user ? (
    <>
      <PlayGameSection gameId={router.query.gameId}></PlayGameSection>
    </>
  ) : (
    <>Loading ...</>
  );
}
