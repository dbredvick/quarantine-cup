import React, { useEffect } from "react";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "next/router";
import NewGameSection from "../components/NewGameSection";
function GamePage(props) {
  const router = useRouter();
  let action = router.query?.action;
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === false) {
      router.push("/auth/signin");
    }
  }, [auth, router]);

  if (!action) action = "new"; //default to new if user hits this page w/o an action

  // new section

  // new user config section

  // new game config section

  // join section
  // new user config section
  // returning user section

  // join game config section

  return (
    <div>
      {action === "new" && (
        <NewGameSection
          title="Start a game"
          subtitle="You're the host"
          join={false}
        />
      )}
      {action === "join" && (
        <NewGameSection
          title="Join a game"
          subtitle="Ask the host for the access code"
          join={true}
        />
      )}
    </div>
  );
}

export default GamePage;
