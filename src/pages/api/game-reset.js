const requireAuth = require("./_require-auth.js");
const firebaseAdmin = require("./_firebase");
import { useGameByIdOrCode } from "../../server-utils/game-helpers";
const { generateDeckOfCards } = require("../../util/constants");

export default requireAuth(async (req, res) => {
  const user = req.user;
  const { uid, gameId } = req.query;

  if (uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Game move must have the same uid as authenticated user",
    });
  }

  // Create user in database here.
  // For testing, we'll return a user object containing our body data.
  let [data, err] = await useGameByIdOrCode(gameId);

  if (err) {
    res.json({ status: "error", error: err, data: "game not found" });
    console.log(err);
  }

  //check if reset is valid
  let errorMessage = "";

  if (!data.state.length === 0) {
    errorMessage = `error: can't reset game unless it's over`;
  }
  if (errorMessage.length) {
    console.log(errorMessage);
    return res.json({ status: "error", err: errorMessage });
  }
  // reset
  try {
    const db = firebaseAdmin.firestore();

    const gameRef = db.collection("games").doc(data.id);

    const newDeckOfCards = generateDeckOfCards();
    const hostInfo = data.users.find((x) => x.uid == uid);
    hostInfo.cards = [];
    hostInfo.isMyTurn = true;

    const otherUsers = data.users
      .map((x) => {
        x.cards.length = 0;
        return x;
      })
      .filter((x) => x.uid != uid);

    const result = await gameRef.update({
      state: newDeckOfCards,
      lastPlayed: {},
      users: [hostInfo, ...otherUsers],
      status: "playing",
    });

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
