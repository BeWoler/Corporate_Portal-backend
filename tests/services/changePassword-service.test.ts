import { ChangePasswordService } from "../../src/services/changePassword-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

const ObjectId = require("mongodb").ObjectId;

dotenv.config();

const userId = new ObjectId("61e15956b449213699a20d3a");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("ChangePassword service", () => {
  it("Change pass with wrong old password", async () => {
    await ChangePasswordService.edit(userId, "12345", "12412412412412").catch(
      (err) => {
        expect(err.status).toBe(400);
        expect(err.message).toBe("Incorrect old password");
      }
    );
  });

  it("Change pass with equal passwords", async () => {
    await ChangePasswordService.edit(userId, "1234", "1234").catch((err) => {
      expect(err.status).toBe(400);
      expect(err.message).toBe(
        "The old password cannot be equal to the new password"
      );
    });
  });

  it("Change pass with the right passwords", async () => {
    const res = await ChangePasswordService.edit(userId, "12345", "1234");
    expect(res.user);
    expect(res.refreshToken);
    expect(res.accessToken);

    await ChangePasswordService.edit(userId, "1234", "12345");
    expect(res.user);
    expect(res.refreshToken);
    expect(res.accessToken);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
