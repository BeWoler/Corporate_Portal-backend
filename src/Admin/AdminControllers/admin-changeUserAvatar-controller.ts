import { AdminChangeUserAvatarService } from "../AdminServices/admin-changeUserAvatar-service";

export class AdminChangeUserAvatarController {
  public static async save(req, res, next) {
    try {
      const { userId, avatarUrl } = req.body;
      const imgPath = await AdminChangeUserAvatarService.save(
        userId,
        "http://localhost:3010/" + avatarUrl
      );
      return res.json(imgPath);
    } catch (e) {
      next(e);
    }
  }
}
