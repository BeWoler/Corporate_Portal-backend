const logoutService = require("../services/logout-service");

class LogoutController {
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await logoutService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LogoutController();
