import { LoginService } from "../services/login-service";
import * as express from "express";

export class RefreshController {
  public static async refresh(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await LoginService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      res.cookie("username", userData.user.username, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      res.cookie("role", userData.user.role, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
