import { DeleteService } from "../services/delete-service";

export class DeleteController {
  public static async delete(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { userId } = req.body;
      const userData = await DeleteService.delete(refreshToken, userId);

      res.clearCookie("refreshToken");
      res.clearCookie("username");

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
