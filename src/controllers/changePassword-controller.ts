import { ChangePasswordService } from "../services/changePassword-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import * as express from "express";

export class ChangePasswordController {
  public static async edit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", [{ ...errors }]));
      }
      const { userId, oldPassword, newPassword } = req.body;
      const userData = await ChangePasswordService.edit(
        userId,
        newPassword,
        oldPassword
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("username", userData.user.username, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
