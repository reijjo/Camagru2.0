const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  verifyCode: String,
  verified: Boolean,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
		delete returnedObject.__v;
    delete returnedObject._id;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
