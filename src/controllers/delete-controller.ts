import { DeleteService } from "../services/delete-service";

export class DeleteController {
  public static async delete(req, res, next) {
    try {
      const { refreshToken, username } = req.cookies;
      const userData = await DeleteService.delete(refreshToken, username);

      res.clearCookie("refreshToken");
      res.clearCookie("username");

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
