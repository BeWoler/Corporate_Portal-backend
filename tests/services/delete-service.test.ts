import { DeleteService } from "../../src/services/delete-service";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const ObjectId = require("mongodb").ObjectId;

const userId = new ObjectId("61e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("Delete service test", () => {
  it("Delete user", async () => {
    const user = await DeleteService.delete("134134", userId);
    expect(user.user).toEqual({ deletedCount: 1 });
  });

  it("Delete unexisting user", async () => {
    const user = await DeleteService.delete(
      "123124",
      new ObjectId("61e15000b449213699a20d3a")
    );
    expect(user.user).toEqual({ deletedCount: 0 });
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
