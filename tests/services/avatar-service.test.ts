import { AvatarService } from "../../src/services/avatar-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Avatar service test", () => {
  it("Change avatar data in user model", async () => {
    await AvatarService.save(userId, "localImg.png").then((res) => {
      expect(res.user.avatar).toBe("http://localhost:3010/localImg.png");
    });
  });

  it("Change avatar data with incorrect file type", async () => {
    await AvatarService.save(userId, "localImg.exe").catch((err) => {
      expect(err.status).toBe(500);
    });
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
