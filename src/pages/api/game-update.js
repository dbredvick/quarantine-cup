const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const user = req.user;
  const body = req.body;
  const { uid } = req.query;

  if (uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself"
    });
  }

  // Update user in database here.
  // For testing, we'll return a user object containing our body data.
  const userData = {
    uid: uid,
    ...body
  };

  res.send({
    status: "success",
    data: userData
  });
});
