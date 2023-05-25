const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Img", imageSchema);
