const Router = require("express").Router;
const registrationController = require("../controllers/registration-controller");
const loginController = require("../controllers/login-controller");
const { body } = require("express-validator");

process.setMaxListeners(0);

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  registrationController.registration
);

router.post("/login", loginController.login);

router.get("/refresh");

module.exports = router;
