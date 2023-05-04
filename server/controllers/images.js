const express = require("express");
const config = require("../utils/config");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const imageRouter = express.Router();

const uploadDir = path.join(__dirname, `../uploads`);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
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

imageRouter.post("/preview", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;
  // const user = JSON.parse(req.body.user);
  // const userPreviewDir = path.join(uploadDir, user.username, "preview");

  // if (!fs.existsSync(userPreviewDir)) {
  //   fs.mkdirSync(userPreviewDir, { recursive: true });
  // }

  // const newFilePath = path.join(userPreviewDir, req.file.originalname);
  // fs.rename(filePath, newFilePath, (err) => {
  //   if (err) {
  //     console.error("ERROR MOVING FILE", err);
  //   } else {
  //     console.log("jee", newFilePath);
  //     res.send(newFilePath);
  //   }
  // });
  // console.log("FILEPA", req.file);
  // console.log("USERR", user.username);
  res.send(`${filePath}`);
});

module.exports = imageRouter;
