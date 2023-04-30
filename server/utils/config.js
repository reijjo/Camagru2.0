require("dotenv").config();

let PORT = process.env.PORT;

let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

let EMAIL_SERVICE = process.env.EMAIL_SERVICE;
let EMAIL_USERNAME = process.env.EMAIL_USERNAME;
let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
  PORT,
  MONGODB_URI,
  EMAIL_SERVICE,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
};
