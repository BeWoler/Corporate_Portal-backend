import { AvatarService } from "../services/avatar-service";

export class AvatarController {
  public static async save(req, res, next) {
    try {
      if (req.file) {
        const { username } = req.cookies;
        const imgPath = await AvatarService.save(
          username,
          "http://localhost:3010/" + req.file.path
        );
        return res.json(imgPath);
      }
    } catch (e) {
      next(e);
    }
  }
}
