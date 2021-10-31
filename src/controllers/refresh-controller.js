const loginService = require("../services/login-service");

class RefreshController {
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookie;
      const userData = await loginService.refresh(refreshToken);
      res.cookie("refreshToken", userDara.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
