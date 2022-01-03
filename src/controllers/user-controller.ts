import { UserService } from "../services/user-service";

export class UserController {
  public static async getUserInfo(req, res, next) {
    try {
      const user = await UserService.getUserInfo(req.params.userId);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public static async blockUser(req, res, next) {
    try {
      const userId = req.body.userId;
      const blockedUserId = req.body.blockedUserId;
      const blockedUser = await UserService.blockUser(userId, blockedUserId);

      return res.json(blockedUser);
    } catch (e) {
      next(e);
    }
  }

  public static async unblockUser(req, res, next) {
    try {
      const userId = req.body.userId;
      const blockedUserId = req.body.blockedUserId;
      const unblockedUser = await UserService.unblockUser(userId, blockedUserId);

      return res.json(unblockedUser);
    } catch (e) {
      next(e);
    }
  }

  public static async getUsers(req, res, next) {
    try {
      const args = req.query;
      const users = await UserService.getAllUsers(args);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}
