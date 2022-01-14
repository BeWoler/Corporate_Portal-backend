import { LogoutService } from "../services/logout-service";
import * as express from "express";

export class LogoutController {
  public static async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const token = await LogoutService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.clearCookie("username");
      res.clearCookie("role");

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}
