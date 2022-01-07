import { EditUserService } from "../services/editUser-service";

export class EditUserController {
  public static async editUser(req, res, next) {
    try {
      const userId = req.body.userId;
      const userInfo = req.body.userInfo;
      const userData = await EditUserService.editUser(userId, { ...userInfo });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("username", userData.user.username, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
