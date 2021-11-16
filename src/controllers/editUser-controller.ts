import { EditUserService } from "../services/editUser-service";

export class EditUserController {
  public static async editUser(req, res, next) {
    try {
      const { username } = req.cookies;
      const userInfo = req.body;
      const userData = await EditUserService.editUser(username, userInfo);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("username", userData.user.username, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    }
    catch (e) {
      next(e)
    }
  }
}