import { Router } from "express";
import { body } from "express-validator";
import { AdmiChangeUserPasswordController } from "../AdminControllers/admin-changeUserPassword-controller";
import { AdminDeleteUserController } from "../AdminControllers/admin-deleteUser-controller";
import { AdminEditUserController } from "../AdminControllers/admin-editUser-controller";
import { AdminRegistrationController } from "../AdminControllers/admin-registration-controller";
import { AdminChangeUserAvatarController } from "../AdminControllers/admin-changeUserAvatar";

const multerMiddleware = require("../../middlewares/multer-middleware");

process.setMaxListeners(0);

export const adminRouter = Router();

adminRouter.post(
  "/avatar",
  multerMiddleware.single("image"),
  AdminChangeUserAvatarController.save
);
adminRouter.patch("/editInfo", AdminEditUserController.editUser);
adminRouter.post("/delete", AdminDeleteUserController.delete);
adminRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  AdminRegistrationController.registration
);
adminRouter.patch(
  "/changePassword",
  body("newPassword").isLength({ min: 3, max: 16 }),
  AdmiChangeUserPasswordController.edit
);
