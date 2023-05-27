const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  verifyCode: String,
  verified: Boolean,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Img",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
      ? returnedObject._id.toString()
      : null;
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
