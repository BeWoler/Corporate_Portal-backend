import { LogoutService } from "../services/logout-service";

export class LogoutController {
  public static async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await LogoutService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.clearCookie("username");
      res.clearCookie("role");

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}
