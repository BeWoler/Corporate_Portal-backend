import { LikeService } from "../services/like-service";
import * as express from "express";

export class LikeController {
  public static async like(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { post, user } = req.body;
      const likeData = await LikeService.like(post, user);

      return res.json(likeData);
    } catch (e) {
      next(e);
    }
  }
}
