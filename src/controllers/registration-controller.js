const registrationService = require("../services/registration-service.js");

class registrationController {
  async registration(req, res) {
    try {
      const { email, password, username } = req.body;
      const userData = await registrationService.registration(email, password, username);
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new registrationController();
