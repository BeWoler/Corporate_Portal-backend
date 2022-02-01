import { LikeService } from "../../src/services/like-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b449213699a20d3a");
const postId = new ObjectId("72e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Like service test", () => {
  it("Like post", async () => {
    const like = await LikeService.like(postId, userId);
    expect(like.like.post).toBe(postId);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
