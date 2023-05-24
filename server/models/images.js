const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
});

const imageSchema = mongoose.Schema({
  image: {
    path: String,
    posted: Boolean,
    desc: String,
    comments: [commentSchema],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Img", imageSchema);
