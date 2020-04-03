const requireAuth = require("./_require-auth.js");
const firebaseAdmin = require("./_firebase");
import { useGameByIdOrCode } from "./game-helpers";
export default requireAuth(async (req, res) => {
  const user = req.user;
  const { uid, gameId } = req.query;
  const db = firebaseAdmin.firestore();
  let gameData;

  if (!gameId) {
    // return all games user created or is in
    try {
      const gamesRef = db.collection("games");
      const myGamesRef = await gamesRef.where("owner", "==", user.uid).get();
      const datas = myGamesRef.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      gameData = datas;
    } catch (err) {
      console.log(err);
      return res.json({ status: "error", error: err });
    }
  }

  if (gameId) {
    let [data, err] = useGameByIdOrCode(gameId);
    gameData = data;

    if (err) {
      res.json({ status: "error", error: err, data: "game not found" });
    }
  }

  res.send({
    status: "success",
    data: gameData,
  });
});
