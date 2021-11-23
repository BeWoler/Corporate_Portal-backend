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

  public static async edit(req, res, next) {
    try {
      const { id } = req.body;
      const args = req.body;

      const postData = await PostService.edit(id, args);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async delete(req, res, next) {
    try {
      const { id } = req.body;

      const postData = await PostService.delete(id);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async getPost(req, res, next) {
    try {
      const { username } = req.cookies;

      const userPosts = await PostService.getPost(username);

      return res.json(userPosts);
    } catch (e) {
      next(e);
    }
  }

  public static async getAllPosts(req, res, next) {
    try {
      const allPosts = await PostService.getAllPosts();

      return res.json(allPosts);
    } catch (e) {
      next(e);
    }
  }
}
