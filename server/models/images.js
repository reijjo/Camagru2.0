const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  preview: {
    data: Buffer,
    contentType: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Img", imageSchema);
