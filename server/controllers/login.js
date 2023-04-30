const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
	console.log("USER", user);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password.",
    });
  }

  if (user.verified === false) {
    return res
      .status(401)
      .json({ error: `You must confirm your account (${user.email})` });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  res.status(200).send({ token, username: user.username });
});

module.exports = loginRouter;
