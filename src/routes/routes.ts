import { Router } from "express";
import { body } from "express-validator";
import { RegistrationController } from "../controllers/registration-controller";
import { LoginController } from "../controllers/login-controller";
import { RefreshController } from "../controllers/refresh-controller";
import { LogoutController } from "../controllers/logout-controller";
import { DeleteController } from "../controllers/delete-controller";
import { ChangePasswordController } from "../controllers/changePassword-controller";
import { EditUserController } from "../controllers/editUser-controller";
import { PostController } from "../controllers/post-controller";
import { LikeController } from "../controllers/like-controller";
import { AvatarController } from "../controllers/avatar-controller";
import { ConversetionController } from "../controllers/conversation-controller";
import { MessageController } from "../controllers/message-controller";
import { UserController } from "../controllers/user-controller";
import { FriendRequestController } from "../controllers/friendRequest-controller";
import authMiddleware from "../middlewares/auth-middleware";
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

router.post("/like", authMiddleware, LikeController.like);
router.post("/avatar", multerMiddleware.single("image"), AvatarController.save);

router.post(
  "/messenger/conversation",
  authMiddleware,
  ConversetionController.conversation
);
router.post(
  "/messenger/delete",
  authMiddleware,
  ConversetionController.deleteConversation
);
router.post("/messenger/message", authMiddleware, MessageController.message);
router.get(
  "/messenger/message/:conversationId",
  authMiddleware,
  MessageController.getMessages
);
router.get(
  "/messenger/:userId",
  authMiddleware,
  ConversetionController.getConversations
);

router.post("/friend/request", authMiddleware, FriendRequestController.request);
router.post("/friend/accept", authMiddleware, FriendRequestController.accept);
router.post("/friend/decline", authMiddleware, FriendRequestController.decline);
router.post("/friend/delete", authMiddleware, FriendRequestController.delete);
router.get(
  "/friend/requests/:receiverId",
  authMiddleware,
  FriendRequestController.getRequests
);

router.get("/profile/:userId", authMiddleware, UserController.getUserInfo);
router.get("/refresh", RefreshController.refresh);

router.post("/post", authMiddleware, PostController.create);
router.post("/post/comment", authMiddleware, PostController.comment);
router.post("/post/delete", authMiddleware, PostController.delete);
router.post("/post/upload", multerMiddleware.single("files"), (req, res) => {
  res.json({ path: req.file.path });
});
router.get(
  "/post/id/:userId",
  authMiddleware,
  PostController.getAllUserPostsByUserId
);
router.get("/post/all", authMiddleware, PostController.getAllPosts);
router.patch("/post/edit", authMiddleware, PostController.edit);

router.post("/user/block", authMiddleware, UserController.blockUser);
router.post("/user/unblock", authMiddleware, UserController.unblockUser);
router.patch(
  "/changePassword",
  body("newPassword").isLength({ min: 3, max: 16 }),
  authMiddleware,
  ChangePasswordController.edit
);
router.patch("/editInfo", authMiddleware, EditUserController.editUser);
router.get("/users/", authMiddleware, UserController.getUsers);
