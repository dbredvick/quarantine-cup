const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const user = req.user;
  const { uid } = req.query;

  if (uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself"
    });
  }

  // Fetch user data from database here.
  // For testing, we'll just return this fake user.
  const userData = {
    uid: uid,
    email: "fake-user@gmail.com",
    name: "Bob"
  };

  res.send({
    status: "success",
    data: userData
  });
});
