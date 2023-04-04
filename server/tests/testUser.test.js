const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./testUser_helper");
const bcrypt = require("bcrypt");
const testRouter = require("../models/testfile");

const api = supertest(app);

describe("users in database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("salaisuus", 10);
    const user = new User({
      email: "repe_wow@outlook.com",
      username: "repe_wow",
      passwordHash,
    });
    const user2 = new User({
      email: "luisa@lore.com",
      username: "liisa",
      passwordHash,
    });

    await user.save();
    await user2.save();
  });

  test("get default users", async () => {
    const users = await helper.usersInDb();
    expect(users).toHaveLength(2);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
