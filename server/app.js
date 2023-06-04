const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const middleware = require("./utils/middleware");
const testRouter = require("./models/testfile");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const imageRouter = require("./controllers/images");

mongoose.set("strictQuery", false);

logger.info("Trying to connect...", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("...connected to MongoDB!");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));
app.use(middleware.requestLogger);

app.use(express.static("build"));
app.use(express.static("uploads"));

app.use("/api/images", express.static(path.join(__dirname, "img")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/images", imageRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);

module.exports = app;
