import { FriendRequestService } from "../../src/services/friendRequest-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b449213699a20d3a");
const secondUserId = new ObjectId("61e15956b449213699a20d4a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Friend requests service test", () => {
  it("Create request", async () => {
    const request = await FriendRequestService.request(userId, secondUserId);
    expect(request.receiver).toBe(userId);
    expect(request.sender).toBe(secondUserId);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
