require("dotenv").config();

let PORT = process.env.PORT;

let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
  PORT,
  MONGODB_URI,
};
