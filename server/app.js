const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const testRouter = require("./models/testfile");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

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
app.use(middleware.requestLogger);

app.use("/", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);

module.exports = app;
