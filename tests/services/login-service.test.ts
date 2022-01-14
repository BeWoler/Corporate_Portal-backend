import { LoginService } from "../../src/services/login-service";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

beforeAll((done) => {
  mongoose.connect(process.env.DB_URL);
  done();
});

describe("LoginService", () => {
  it("Login withn wrong username", async () => {
    await LoginService.login("fsdsdfsdfsd", "1234").catch((err) => {
      expect(err.status).toBe(400);
      expect(err.message).toBe("User does not exist");
    });
  });

  it("Login withn wrong password", async () => {
    await LoginService.login("test", "gfgdfgdfgdf").catch((err) => {
      expect(err.status).toBe(400);
      expect(err.message).toBe("Incorrect password");
    });
  });

  it("Login withn the right data", async () => {
    const res = await LoginService.login("test", "1234");

    expect(res.user);
    expect(res.accessToken);
    expect(res.refreshToken);
    expect(res.userPassword);
    expect(res.user.username).toBe("test");
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
