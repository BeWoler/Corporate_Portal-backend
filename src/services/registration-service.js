const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const apiError = require("../exceptions/api-error");

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
    return user;
  }
}

module.exports = new RegistrationService();
