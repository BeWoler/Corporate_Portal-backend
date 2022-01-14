import { PostService } from "../services/post-service";
import * as express from "express";

export class PostController {
  public static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userId, text, fileName } = req.body;
      const filePath = `http://localhost:3010/${fileName}`;
      const postData = await PostService.create(userId, text, filePath);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async edit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { id } = req.body;
      const { text } = req.body;

      const postData = await PostService.edit(id, text);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async comment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { id, text, userId } = req.body;

      const postData = await PostService.comment(id, text, userId);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { id } = req.body;

      const postData = await PostService.delete(id);

      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  public static async getAllUserPostsByUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.params.userId;

      const userPosts = await PostService.getAllUserPostsByUserId(userId);

      return res.json(userPosts);
    } catch (e) {
      next(e);
    }
  }

  public static async getAllPosts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const allPosts = await PostService.getAllPosts();

      return res.json(allPosts);
    } catch (e) {
      next(e);
    }
  }
}
