import { AdminChangePasswordService } from "../AdminServices/admin-changeUserPassword-service";
import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/api-error";
import * as express from "express";

export class AdmiChangeUserPasswordController {
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
      const { userId, newPassword } = req.body;
      const userData = await AdminChangePasswordService.edit(
        userId,
        newPassword
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
