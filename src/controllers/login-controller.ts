import { LoginService } from "../services/login-service";

export class LoginController {
  public static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await LoginService.login(username, password);

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

  public static async getUsers(req, res, next) {
    try {
      const users = await LoginService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}
