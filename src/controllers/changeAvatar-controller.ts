import { ChangeAvatarService } from "../services/changeAvatar-service";

export class ChangeAvatarController {
  public static async changeAvatar(req, res, next) {
    try {
      const { username } = req.cookies;
      const avatar = req.body;
      const userData = await ChangeAvatarService.changeAvatar(username, avatar);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
