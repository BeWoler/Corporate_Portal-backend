import { LoginService } from "../services/login-service";

export class RefreshController {
  public static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await LoginService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
