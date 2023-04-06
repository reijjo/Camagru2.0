const bcrypt = require("bcrypt");
const User = require("../models/user");

const usersRouter = require("express").Router();
// const User = require("../models/users");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { email, username, password, confPassword } = req.body;
  console.log("BACKBACK", email, username, password, confPassword);

  if (password !== confPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  // EMAIL CHECKS
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const emailExists = await User.findOne({ email: email });

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address!" });
  }

  if (email.length < 5 || email.length > 50) {
    return res
      .status(400)
      .json({ error: "Nobody has that short/long email address." });
  }

  if (emailExists) {
    return res.status(400).json({ error: "Email already exists." });
  }

  // USERNAME CHECKS

  const usernameRegex = /^[a-zA-Z0-9!_-]+$/;
  const usernameExists = await User.findOne({ username: username });

  if (usernameExists) {
    return res.status(400).json({ error: "Username alread exists. " });
  }

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error:
        "Invalid username! Only letters, numbers, and the special characters ('!', '-', '_') are allowed.",
    });
  }

  if (username.length < 3 || username.length > 30) {
    return res
      .status(400)
      .json({ error: "Username must have at least 3 and max 30 characters." });
  }

  // PASSWORD CHECKS

  const passwordRegex = /^[a-zA-Z0-9!_-]+$/;
  const validRegex = /^(?=.*[A-Z])(?=.*[!_-])(?=.*\d).*$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Invalid password! Only letters, numbers, and the special characters ('!', '-', '_') are allowed.",
    });
  }

  if (!validRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must contain at least one capital letter, one number and one special character (!-_).",
    });
  }

  if (password.length < 8 || password.length > 30) {
    return res
      .status(400)
      .json({ error: "Password must have at least 8 and max 30 characters." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email,
    username: username,
    password: passwordHash,
    verified: false,
  });

  const savedUser = await newUser.save();
  res.status(201).json({ savedUser, message: `User '${username}' created!` });
});

module.exports = usersRouter;
