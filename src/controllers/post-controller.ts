import { PostService } from "../services/post-service";

export class PostController {
  public static async create(req, res, next) {
    try {
      const { username } = req.cookies;
      const { text } = req.body;

      const postData = await PostService.create(username, text);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }
}
