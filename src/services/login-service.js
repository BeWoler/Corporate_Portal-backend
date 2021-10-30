const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const apiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

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

    const userDto = new UserDto(user);
    
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens
    };
  }
}

module.exports = new LoginService();
