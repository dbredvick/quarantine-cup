import React, { useEffect } from "react";
import { useAuth } from "../../util/auth";
import { useRouter } from "next/router";
import PlayGameSection from "../../components/PlayGameSection.js";

export default function Play() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push("/auth/signin");
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
