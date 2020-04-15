const requireAuth = require("./_require-auth.js");
const firebaseAdmin = require("./_firebase");
import { useGameByIdOrCode } from "./game-helpers";

export default requireAuth(async (req, res) => {
  const user = req.user;
  const body = req.body;
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

  //check if move is valid
  let errorMessage = "";

  const topCards = data.state.slice(0, 6);
  const submittedCardIsPresent = topCards.find(
    (x) => x.value == body.value && x.suit == body.suit && x.num == body.num
  );
  const isItUsersTurn = data.users.find((x) => x.isMyTurn && x.uid == uid);
  if (!submittedCardIsPresent) {
    errorMessage = `bad play submitted: ${user.uid} - ${gameId} - ${body.value},${body.suit}`;
  }
  if (!isItUsersTurn) {
    errorMessage = `bad play submitted: ${user.uid} - ${gameId} - WAIT YOUR TURN`;
  }
  if (errorMessage.length) {
    console.log(errorMessage);
    return res.json({ status: "error", err: errorMessage });
  }

  try {
    const db = firebaseAdmin.firestore();

    const gameRef = db.collection("games").doc(data.id);

    const remainingCards = data.state.filter((x) => x.num != body.num);
    const userInfo = data.users.find((x) => x.uid == uid);
    userInfo.cards.push(body);
    userInfo.isMyTurn = false;

    const otherUsers = data.users.filter((x) => x.uid != uid);
    let nextUser;
    if (otherUsers.length === 0) {
      userInfo.isMyTurn = true;
    } else {
      nextUser = otherUsers[0];
      nextUser.isMyTurn = true;
      otherUsers.splice(0, 1);
    }

    const result = await gameRef.update({
      state: remainingCards,
      lastPlayed: body,
      users:
        nextUser && nextUser.uid
          ? [userInfo, nextUser, ...otherUsers]
          : [userInfo, ...otherUsers],
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
