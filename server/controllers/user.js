const express = require("express");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const { scryptSync, randomBytes } = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const usersRouter = express.Router();

// API/USERS

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// API/REGISTER

usersRouter.post("/register", async (req, res) => {
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
    return res.status(400).json({ error: "Username already exists. " });
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
  const salt = randomBytes(16).toString("hex");
  const hashUser = scryptSync(username + password, salt, 64);
  const codeHash = `${hashUser.toString("hex")}`;

  const newUser = new User({
    email: email,
    username: username,
    password: passwordHash,
    verifyCode: codeHash,
    verified: false,
  });

  const savedUser = await newUser.save();

  // SEND CONFIRMATION EMAIL

  console.log("email", config.EMAIL_SERVICE);

  const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: config.EMAIL_USERNAME,
    to: newUser.email,
    subject: "Verification for Camagru",
    html: `<h1>Hi! Click the link: <a href='http://localhost:3000/register/${codeHash}'> Here! </a> </h1>`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("Error sending email: ", err);
    } else {
      console.log("Email sent:", info);
    }
  });

  res
    .status(201)
    .json({ savedUser, message: `Registration email send to ${email}` });
});

usersRouter.get("/register/:verifyCode", async (req, res) => {
  const verifyCode = req.params.verifyCode;
  const user = await User.findOne({ verifyCode: verifyCode });

  if (!user) {
    return res.json({ message: "User not found! " });
  }

  user.verified = true;
  await user.save();

  res.json({ message: `User succesfully verified!`, user });
});

// API/FORGOT

usersRouter.post("/forgot", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    return res.json({ message: "Invalid email address!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "No such email!" });
  }

  const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: config.EMAIL_USERNAME,
    to: user.email,
    subject: "Create new password!",
    html: `<h1>Click the link to change your password: <a href='http://localhost:3000/forgot/${user.verifyCode}'> THE LINK </a> </h1>`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("Error sending mail", err);
    } else {
      console.log("Email sent:", info);
    }
  });

  console.log("USER", user);
});

usersRouter.get("/forgot/:verifyCode", async (req, res) => {
  const verifyCode = req.params.verifyCode;
  const user = await User.findOne({ verifyCode: verifyCode });

  if (!user) {
    return res.json({ message: "User not found! " });
  }

  res.json({ user });
});

usersRouter.put("/forgot", async (req, res) => {
  const { verifyCode, newPassword } = req.body;
  const user = await User.findOne({ verifyCode: verifyCode });

  // console.log("User", user);
  console.log("pw", newPassword);

  if (!user) {
    return res.json({ message: "User not found!" });
  }
  const passwordRegex = /^[a-zA-Z0-9!_-]+$/;
  const validRegex = /^(?=.*[A-Z])(?=.*[!_-])(?=.*\d).*$/;

  if (!passwordRegex.test(newPassword)) {
    return res.json({
      message:
        "Invalid password! Only letters, numbers, and the special characters ('!', '-', '_') are allowed.",
      style: { color: "red", border: "2px solid" },
    });
  }

  if (!validRegex.test(newPassword)) {
    return res.json({
      message:
        "Password must contain at least one capital letter, one number and one special character (!-_).",
      style: { color: "red", border: "2px solid" },
    });
  }

  if (newPassword.length < 8 || newPassword.length > 30) {
    return res.json({
      message: "Password must have at least 8 and max 30 characters.",
      style: { color: "red", border: "2px solid" },
    });
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user._id, { password: newPasswordHash });
  res.json({
    message: "Password updated succesfully!",
    style: { color: "green", border: "2px solid" },
  });
});

module.exports = usersRouter;
