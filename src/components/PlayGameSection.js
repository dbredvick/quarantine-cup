import { useSingleGame, useUser } from "../util/db";
import { useAuth } from "../util/auth";

export default function PlayGameSection(props) {
  const auth = useAuth();
  const uid = auth.user && auth.user.uid;
  const { data: user, status } = useUser(uid);
  const { data: singleGame, status: otherStatus } = useSingleGame(
    auth.user.uid,
    props.gameId
  );
  console.log(otherStatus);
  console.log(status);

  if (status === "loading" || otherStatus === "loading") {
    return "Loading ...";
  }
  console.log(singleGame);

  return <>{singleGame.id}</>;
}
