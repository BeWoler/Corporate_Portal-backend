import { EditUserService } from "../../src/services/editUser-service";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const ObjectId = require("mongodb").ObjectId;

const userId = new ObjectId("61e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Edit user data service test", () => {
  it("Edit data", async () => {
    const user = await EditUserService.editUser(userId, { city: "Kiev" });
    expect(user.user.city).toEqual("Kiev");
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
