import { RegistrationService } from "../services/registration-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import * as express from "express";

export class RegistrationController {
  public static async registration(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", [{ ...errors }]));
      }
      const { email, password, username, firstName, lastName } = req.body;
      const userData = await RegistrationService.registration(
        email,
        password,
        username,
        firstName,
        lastName
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
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
