import { Router } from "express";
import { body } from "express-validator";
import { RegistrationController } from "../controllers/registration-controller";
import { LoginController } from "../controllers/login-controller";
import { RefreshController } from "../controllers/refresh-controller";
import { LogoutController } from "../controllers/logout-controller";
import { DeleteController } from "../controllers/delete-controller";
import { ChangePasswordController } from "../controllers/changePassword-controller";
import authMiddleware from "../middlewares/auth-middleware";
import { EditUserController } from "../controllers/editUser-controller";
import { PostController } from "../controllers/post-controller";
import { LikeController } from "../controllers/like-controller";
import { AvatarController } from "../controllers/avatar-controller";
const multerMiddleware = require("../middlewares/multer-middleware");

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
router.post("/delete", DeleteController.delete);
router.post("/post", PostController.create);
router.post("/post/comment", PostController.comment);
router.post("/post/delete", PostController.delete);
router.post("/like", LikeController.like);
router.post("/avatar", multerMiddleware.single("image"), AvatarController.save);

router.get("/refresh", RefreshController.refresh);
router.get("/userPosts", PostController.getPost);
router.get("/allPosts", PostController.getAllPosts);
router.get("/users", authMiddleware, LoginController.getUsers);

router.patch("/post/edit", PostController.edit);
router.patch(
  "/changePassword",
  body("newPassword").isLength({ min: 3, max: 16 }),
  ChangePasswordController.edit
);
router.patch("/editInfo", EditUserController.editUser);
