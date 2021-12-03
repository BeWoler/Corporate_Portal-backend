import { LikeService } from "../services/like-service";

export class LikeController {
  public static async like(req, res, next) {
    try {
      const { post, user } = req.body;
      const likeData = await LikeService.like(post, user);

      return res.json(likeData);
    } catch (e) {
      next(e);
    }
  }
}
