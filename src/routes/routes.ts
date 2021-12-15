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
import { ConversetionController } from "../controllers/conversation-controller";
import { MessageController } from "../controllers/message-controller";
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
router.post("/delete", authMiddleware, DeleteController.delete);
router.post("/post", authMiddleware, PostController.create);
router.post("/post/comment", authMiddleware, PostController.comment);
router.post("/post/delete", authMiddleware, PostController.delete);
router.post("/like", authMiddleware, LikeController.like);
router.post("/avatar", multerMiddleware.single("image"), AvatarController.save);
router.post("/post/upload", multerMiddleware.single("files"), (req, res) => {
  res.json({ path: req.file.path });
});
router.post("/messenger/conversation", ConversetionController.conversation);
router.post("/messenger/message", MessageController.message);

router.get("/messenger/:conversationId", MessageController.getMessages);
router.get("/messenger/:userId", ConversetionController.getConversations);
router.get("/refresh", RefreshController.refresh);
router.get("/userPosts", authMiddleware, PostController.getPost);
router.get("/allPosts", authMiddleware, PostController.getAllPosts);
router.get("/users", authMiddleware, LoginController.getUsers);

router.patch("/post/edit", authMiddleware, PostController.edit);
router.patch(
  "/changePassword",
  authMiddleware,
  body("newPassword").isLength({ min: 3, max: 16 }),
  ChangePasswordController.edit
);
router.patch("/editInfo", authMiddleware, EditUserController.editUser);
