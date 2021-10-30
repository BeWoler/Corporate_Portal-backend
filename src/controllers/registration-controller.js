const registrationService = require("../services/registration-service");
const { validationResult } = require("express-validator");
const apiError = require("../exceptions/api-error");

class RegistrationController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(
          apiError.BadRequest("Validation error", errors.array())
        );
      }
      const { email, password, username } = req.body;
      const userData = await registrationService.registration(
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

module.exports = new RegistrationController();
