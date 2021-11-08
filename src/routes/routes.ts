import { Router } from "express";
import { body } from "express-validator";
import { RegistrationController } from "../controllers/registration-controller";
import { LoginController } from "../controllers/login-controller";
import { RefreshController } from "../controllers/refresh-controller";
import { LogoutController } from "../controllers/logout-controller";
import authMiddleware from "../middlewares/auth-middleware";

process.setMaxListeners(0);

export const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  RegistrationController.registration
);

router.post("/login", LoginController.login);
router.post("/logout", LogoutController.logout);
router.get("/refresh", RefreshController.refresh);

router.get("/users", authMiddleware, LoginController.getUsers);
