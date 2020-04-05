import React, { useEffect } from "react";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "next/router";
import NewGameSection from "../components/NewGameSection";
function GamePage(props) {
  const router = useRouter();
  let action = router.query?.action;
  let code = router.query?.code;
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === false) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );
      // might need to change this to just the path not the window location
      router.push(`/auth/signin?redirect=${redirectTo}`);
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
          subtitle={
            code
              ? `Your room code is ${code}.`
              : `Ask the of the game for the room code`
          }
          join={true}
        />
      )}
    </div>
  );
}

export default GamePage;
