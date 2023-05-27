const express = require("express");
const config = require("../utils/config");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/user");
const Img = require("../models/images");

const imageRouter = express.Router();

const baseUrl = "http://localhost:3001";

const uploadDir = path.join(__dirname, `../uploads`);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("uploads/ folder created.");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname || "image.png";
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Get preview photos
imageRouter.get("/preview", async (req, res) => {
  const userId = req.query.userId;
  console.log("userID", userId);

  const user = await User.findById(userId).populate("images");
  console.log("imAGEE", user);

  // const images = await Img.findById(user._id);
  const images = await Img.find({ user: userId });

  // console.log("images", images);
  const previews = images.filter((images) => images.image.posted === false);

  console.log("pre", previews);

  res.json(previews);
});

// Post preview photo
imageRouter.post("/preview", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;
  const user = await JSON.parse(req.body.user);

  const userPreviewDir = path.join(uploadDir, user.user.username, "preview");

  if (!fs.existsSync(userPreviewDir)) {
    fs.mkdirSync(userPreviewDir, { recursive: true });
  }

  const newPath = path.join(userPreviewDir, req.file.originalname);
  fs.renameSync(filePath, newPath);

  console.log("newPath", newPath);

  const relativePath = path.relative(
    path.join(__dirname, "../uploads"),
    newPath
  );
  console.log("relativePath", `${baseUrl}/uploads/${relativePath}`);

  console.log("user", user.user.id);

  const db_user = await User.findById(user.user.id);

  console.log("db_user", db_user);

  const previewImage = new Img({
    image: {
      path: `${baseUrl}/uploads/${relativePath}`,
      posted: false,
      desc: "",
      comments: [],
    },
    user: db_user._id,
  });

  const savePreview = await previewImage.save();
  db_user.images.push(savePreview._id);
  await db_user.save();

  res.send({
    filePath: `${baseUrl}/uploads/${relativePath}`,
    message: "Photo saved!",
    style: { color: "green", border: "2px solid" },
  });
});

// Delete preview photo
imageRouter.delete("/preview", async (req, res) => {
  const imageInfo = req.query.image;
  // const imagePath = path.join(imageInfo.image.path.substring(baseUrl.length));
  const imagePath = path.join(
    __dirname,
    "..",
    imageInfo.image.path.substring(baseUrl.length)
  );

  console.log("image", imageInfo);
  console.log("path", imagePath);

  const deletedImage = await Img.findByIdAndDelete(imageInfo._id);
  if (!deletedImage) {
    console.log("image not found");
  } else {
    const user = await User.findById(deletedImage.user);
    user.images = user.images.filter(
      (imageId) => !imageId.equals(deletedImage._id)
    );
    await user.save();
  }

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log("path found!");
  } else {
    console.log("IMAGE PATH NOT FOUND!");
  }

  res.send({
    message: "Preview deleted!",
    style: { color: "red", border: "2px solid" },
  });
});

// loggedIn/:id
imageRouter.get("/loggedIn/:id", async (req, res) => {
  const imageId = req.params.id;
  console.log("IMAGEID", imageId);

  try {
    const result = await Img.findOne({ _id: imageId });
    console.log("resul", result);
    res.json(result);
  } catch (error) {
    console.log("Error getting image", error);
    return res.json({ message: "fail" });
  }
});

imageRouter.put("/loggedIn/:id", async (req, res) => {
  const imageId = req.params.id;
  const desc = req.body.desc;

  console.log("imageId", imageId);
  console.log("imagedsc", desc);

  const updatedTime = new Date();

  const update = {
    "image.posted": true,
    "image.desc": desc,
    createdAt: updatedTime,
  };

  const image = await Img.findOneAndUpdate(
    { _id: imageId },
    update,
    {
      new: true,
    }
    // { _id: imageId },
    // { posted: true, desc: desc },
    // { new: true }
  );
  console.log("image", image);
  console.log("image DESC", image.image.desc);
  console.log("image POSTED", image.image.posted);
  res.json(image);
});

// Get Images For Feed
imageRouter.get("/", async (req, res) => {
  try {
    const result = await Img.find({ "image.posted": true })
      .sort({
        createdAt: -1,
      })
      .populate({ path: "image.comments.user", model: "User" });

    res.json({ image: result });
  } catch (error) {
    console.log("Error getting images for feed: ", error);
  }
});

// COMMENTS
imageRouter.post("/comment", async (req, res) => {
  const { comment, imageId, user } = req.body;
  console.log("comment", comment);
  console.log("imageId", imageId);
  console.log("user", user);

  try {
    const image = await Img.findById(imageId);
    console.log("image from db", image);

    const userName = await User.findById(user);
    console.log("user from db", userName.username);

    const newComment = {
      user: user,
      comment: comment,
    };

    image.image.comments.push(newComment);

    await image.save();

    res.send({ message: "Comment added succesfully!" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ error: "failed to add comment." });
  }
});

imageRouter.get("/comment", async (req, res) => {
  const imageId = req.query.imageId;
  try {
    const image = await Img.findById(imageId).populate("image.comments.user");

    console.log("username", username);
    res.json({ image: image.image.comments, username: username });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).send({ error: "Failed to retrieve comments" });
  }
});

module.exports = imageRouter;
