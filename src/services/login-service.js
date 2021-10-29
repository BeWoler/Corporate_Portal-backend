const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class LoginService {
  async login(username, password) {
    const user = await userModel.findOne({username})
    if(!user) {
      throw Error('User does not exist');
    }
    const isPassEqu = await bcrypt.compare(password, user.password);
    if(!isPassEqu) {
      throw Error('Incorrect password');
    }
    return user;
  }
}

module.exports = new LoginService();