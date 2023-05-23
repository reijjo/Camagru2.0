const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  image: {
    path: String,
    posted: Boolean,
    desc: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Img", imageSchema);
