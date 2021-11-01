const tokenService = require("../services/token-service");

class LogoutService {
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new LogoutService();
