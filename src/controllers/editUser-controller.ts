import { EditUserService } from "../services/editUser-service";
import * as express from "express";

export class EditUserController {
  public static async editUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.body.userId;
      const userInfo = req.body.userInfo;
      const userData = await EditUserService.editUser(userId, { ...userInfo });

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
