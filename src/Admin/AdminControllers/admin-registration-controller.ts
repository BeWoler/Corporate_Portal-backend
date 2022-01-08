import { AdminRegistrationService } from "../AdminServices/admin-registration-service";
import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/api-error";

export class AdminRegistrationController {
  public static async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", [{ ...errors }]));
      }
      const { email, password, username, firstName, lastName, role } = req.body;
      const userData = await AdminRegistrationService.registration(
        email,
        password,
        username,
        firstName,
        lastName,
        role
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
