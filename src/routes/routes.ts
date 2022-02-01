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
const multerMiddleware = require("../middlewares/multer-middleware");
const multerAvatarMiddleware = require("../middlewares/multerAvatar-middleware");

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

router.post("/like", LikeController.like);
router.post(
  "/avatar",
  multerAvatarMiddleware.single("image"),
  AvatarController.save
);

router.post(
  "/messenger/conversation",

  ConversetionController.conversation
);
router.post(
  "/messenger/delete",

  ConversetionController.deleteConversation
);
router.post("/messenger/message", MessageController.message);
router.get(
  "/messenger/message/:conversationId",

  MessageController.getMessages
);
router.get(
  "/messenger/:userId",

  ConversetionController.getConversations
);

router.post("/friend/request", FriendRequestController.request);
router.post("/friend/accept", FriendRequestController.accept);
router.post("/friend/decline", FriendRequestController.decline);
router.post("/friend/delete", FriendRequestController.delete);
router.get(
  "/friend/requests/:receiverId",

  FriendRequestController.getRequests
);

router.get("/profile/:userId", UserController.getUserInfo);
router.get("/refresh", RefreshController.refresh);

router.post("/post", PostController.create);
router.post("/post/comment", PostController.comment);
router.post("/post/delete", PostController.delete);
router.post("/post/upload", multerMiddleware.single("files"), (req, res) => {
  res.json({ path: req.file.path });
});
router.get(
  "/post/id/:userId",

  PostController.getAllUserPostsByUserId
);
router.get("/post/all", PostController.getAllPosts);
router.patch("/post/edit", PostController.edit);

router.post("/user/block", UserController.blockUser);
router.post("/user/unblock", UserController.unblockUser);
router.patch(
  "/changePassword",
  body("newPassword").isLength({ min: 3, max: 16 }),

  ChangePasswordController.edit
);
router.patch("/editInfo", EditUserController.editUser);
router.get("/users/", UserController.getUsers);
