const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const user = req.user;
  const body = req.body;
  console.log(body);
  console.log(user);

  if (body.uid !== user.uid) {
    return res.send({
      status: "error",
      message: "Created user must have the same uid as authenticated user",
    });
  }

  // Create user in database here.
  // For testing, we'll return a user object containing our body data.
  const userData = body;

  res.send({
    status: "success",
    data: userData,
  });
});
