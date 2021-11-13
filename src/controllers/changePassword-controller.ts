import { ChangePasswordService } from "../services/changePassword-service";

export class ChangePasswordController {
  public static async edit(req, res, next) {
    try {
      const { username } = req.cookies;
      const { password } = req.body;
      const userData = await ChangePasswordService.edit(username, password);

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
