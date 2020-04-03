const requireAuth = require("./_require-auth.js");
const { generateDeckOfCards } = require("../../util/constants");
const firebaseAdmin = require("./_firebase");
const hri = require("human-readable-ids").hri;

export default requireAuth(async (req, res) => {
  const user = req.user;
  const body = req.body;

  if (body.uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Created game must have the same uid as authenticated user"
    });
  }

  // Create user in database here.
  // For testing, we'll return a user object containing our body data.
  const userData = body;

  const game = {
    name: `${userData.name}'s game`,
    createdDate: new Date().toISOString(),
    users: [{ name: userData.name, uid: user.uid, status: "host" }],
    state: generateDeckOfCards(),
    owner: user.uid,
    roomCode: hri.random()
  };

  const db = firebaseAdmin.firestore();
  try {
    const gameRef = await db.collection("games").add(game);
    const result = { ...game, id: gameRef.id };
    res.json({
      status: "success",
      data: result
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});
