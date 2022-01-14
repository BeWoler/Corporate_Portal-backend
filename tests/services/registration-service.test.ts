import { RegistrationService } from "../../src/services/registration-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("RegistrationService", () => {
  it("Create new user", async () => {
    const res = await RegistrationService.registration(
      "newTest@test.com",
      "1234",
      "newtest",
      "test",
      "test"
    );

    expect(res.user.email).toBe("newTest@test.com");
    expect(res.user.username).toBe("newtest");
    expect(res.user.firstName).toBe("test");
    expect(res.user.lastName).toBe("test");
    expect(res.refreshToken);
    expect(res.accessToken);
    expect(res.userPassword);
  });

  it("Create user with existing username", async () => {
    await RegistrationService.registration(
      "newTest",
      "1234",
      "newtest",
      "test",
      "test"
    ).catch((err) => {
      expect(err.status).toBe(400);
      expect(err.message).toBe("Username already exist");
    });
  });

  it("Create user with existing email", async () => {
    await RegistrationService.registration(
      "newTest@test.com",
      "1234",
      "newtest1234",
      "test",
      "test"
    ).catch((err) => {
      expect(err.status).toBe(400);
      expect(err.message).toBe("Email already exist");
    });
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
