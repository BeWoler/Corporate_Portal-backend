import { AdminChangeUserAvatarService } from "../AdminServices/admin-changeUserAvatar-service";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

export class AdminChangeUserAvatarController {
  public static async save(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userId, avatarUrl } = req.body;
      const imgPath = await AdminChangeUserAvatarService.save(
        userId,
        `${process.env.SERVER_URL}/${avatarUrl}`
      );
      return res.json(imgPath);
    } catch (e) {
      next(e);
    }
  }
}
