const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const apiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class RegistrationService {
  async registration(email, password, username) {
    const candidateEmail = await userModel.findOne({ email });
    const candidateUserName = await userModel.findOne({ username });
    if (candidateEmail) {
      throw apiError.BadRequest("Email already exist");
    }
    if (candidateUserName) {
      throw apiError.BadRequest("Username already exist");
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await userModel.create({
      email,
      password: hashPassword,
      username,
    });

    const userDto = new UserDto(user);
    
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens
    };
  }
}

module.exports = new RegistrationService();
