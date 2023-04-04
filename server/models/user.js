const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
