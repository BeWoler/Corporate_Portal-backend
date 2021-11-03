import { RegistrationService } from "../services/registration-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";

export class RegistrationController {
  public static async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", [])
        );
      }
      const { email, password, username } = req.body;
      const userData = await RegistrationService.registration(
        email,
        password,
        username
      );

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
