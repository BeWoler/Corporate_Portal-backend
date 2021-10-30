const loginService = require("../services/login-service");

class LoginController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await loginService.login(username, password);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true});
      
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LoginController();
