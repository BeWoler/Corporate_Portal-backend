import { LoginService } from "../services/login-service";
import * as express from "express";

export class LoginController {
  public static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { username, password } = req.body;
      const userData = await LoginService.login(username, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: true,
        httpOnly: true,
      });

      res.cookie("username", userData.user.username, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("role", userData.user.role, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
