import { Router } from "express";
import { body } from "express-validator";
import { AdmiChangeUserPasswordController } from "../AdminControllers/admin-changeUserPassword-controller";
import { AdminDeleteUserController } from "../AdminControllers/admin-deleteUser-controller";
import { AdminEditUserController } from "../AdminControllers/admin-editUser-controller";
import { AdminRegistrationController } from "../AdminControllers/admin-registration-controller";
import { AdminChangeUserAvatarController } from "../AdminControllers/admin-changeUserAvatar-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const multerMiddleware = require("../../middlewares/multer-middleware");

process.setMaxListeners(0);

export const adminRouter = Router();

adminRouter.post(
  "/avatar",
  authMiddleware,
  AdminChangeUserAvatarController.save
);
adminRouter.patch(
  "/editInfo",
  authMiddleware,
  AdminEditUserController.editUser
);
adminRouter.post("/delete", authMiddleware, AdminDeleteUserController.delete);
adminRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  authMiddleware,
  AdminRegistrationController.registration
);
adminRouter.patch(
  "/changePassword",
  body("newPassword").isLength({ min: 3, max: 16 }),
  authMiddleware,
  AdmiChangeUserPasswordController.edit
);
adminRouter.post("/upload", multerMiddleware.single("image"), (req, res) => {
  res.json({ path: req.file.path });
});
