import { AvatarService } from "../services/avatar-service";
import * as express from "express";

export class AvatarController {
  public static async save(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
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
