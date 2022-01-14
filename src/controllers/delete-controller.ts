import { DeleteService } from "../services/delete-service";
import * as express from "express";

export class DeleteController {
  public static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const { userId } = req.body;
      const userData = await DeleteService.delete(refreshToken, userId);

      res.clearCookie("refreshToken");
      res.clearCookie("username");
      res.clearCookie("role");

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
