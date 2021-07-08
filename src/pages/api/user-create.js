const requireAuth = require("./_require-auth.js");
const firebaseAdmin = require("./_firebase");
import { emailSignUp } from "../../server-utils/email-helper";

export default requireAuth(async (req, res) => {
  const user = req.user;
  const body = req.body;

  if (body.uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Created user must have the same uid as authenticated user",
    });
  }

  const userData = { ...user, ...body, tier: "early-supporter" };
  const db = firebaseAdmin.firestore();
  try {
    let dbUser = {};
    // check if user already exists
    const userRef = db.collection("users");
    const myUserRef = await userRef.where("email", "==", userData.email).get(); // email is "primary key"

    if (myUserRef.docs.length) {
      console.log("found user");
      const datas = myUserRef.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dbUser = datas[0];
    } else {
      // else insert the user
      const insertUserRef = await db.collection("users").add(userData);
      dbUser = { ...userData, id: insertUserRef.id };
    }
    if (dbUser.email) {
      await emailSignUp(dbUser.email, "1352141", [
        "quarantineCup",
        "user",
        "earlySupporter",
      ]);
    }

    res.json({
      status: "success",
      data: dbUser,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json(err);
  }
});
