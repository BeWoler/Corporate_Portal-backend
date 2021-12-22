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
