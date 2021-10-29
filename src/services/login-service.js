const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const apiError = require("../exceptions/api-error");

class LoginService {
  async login(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw apiError.BadRequest("User does not exist");
    }
    const isPassEqu = await bcrypt.compare(password, user.password);
    if (!isPassEqu) {
      throw apiError.BadRequest("Incorrect password");
    }
    return user;
  }
}

module.exports = new LoginService();
