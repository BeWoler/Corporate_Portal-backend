import { AdminChangePasswordService } from "../AdminServices/admin-changeUserPassword-service";
import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/api-error";

export class AdmiChangeUserPasswordController {
  public static async edit(req, res, next) {
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
