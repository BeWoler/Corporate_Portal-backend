import { AdminChangeUserAvatarService } from "../AdminServices/admin-changeUserAvatar-service";

export class AdminChangeUserAvatarController {
  public static async save(req, res, next) {
    try {
      if (req.file) {
        const { userId } = req.body;
        const imgPath = await AdminChangeUserAvatarService.save(
          userId,
          "http://localhost:3010/" + req.file.path
        );
        return res.json(imgPath);
      }
    } catch (e) {
      next(e);
    }
  }
}
