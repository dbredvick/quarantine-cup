const requireAuth = require("./_require-auth.js");
import { useGameByIdOrCode } from "./game-helpers";
const firebaseAdmin = require("./_firebase");

export default requireAuth(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const { gameId } = req.query;
  if (!gameId) {
    console.log("missing gameId");
    return res
      .status(401)
      .send({ status: "error", data: "please provide a gameId" });
  }
  const [game, error] = await useGameByIdOrCode(gameId);
  if (!game && error) {
    console.log(error);
    return res
      .status(404)
      .send({ status: "error", data: "can't find game", error: error });
  }

  const userAlreadyInGame = game.users.map((x) => x.uid).includes(user.uid);
  if (userAlreadyInGame) {
    return res.send({ status: "success", data: { id: game.id } });
  }

  const picture = user.picture
    ? user.picture
    : `https://api.adorable.io/avatars/285/${user.email}`;

  const db = firebaseAdmin.firestore();
  const userData = {
    ...user,
    picture,
    cards: [],
    name: body.name,
    status: "player",
    isMyTurn: false,
  };
  const gameRef = db.collection("games").doc(game.id);

  gameRef.update({
    users: firebaseAdmin.firestore.FieldValue.arrayUnion(userData),
  });

  res.send({
    status: "success",
    data: { id: game.id },
  });
});
