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

  const user = await User.findById(userId).populate("images");
  // console.log("imAGEE", user);

  const images = await Img.find({ user: userId });
  const previews = images.filter((images) => images.image.posted === false);

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

  const db_user = await User.findOne(user.id);

  const previewImage = new Img({
    image: {
      path: `${baseUrl}/uploads/${relativePath}`,
      posted: false,
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

module.exports = imageRouter;
