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
}
