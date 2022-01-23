import { UserService } from "../services/user-service";
import * as express from "express";

const ObjectId = require("mongodb").ObjectId;

export class UserController {
  public static async getUserInfo(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await UserService.getUserInfo(
        new ObjectId(req.params.userId)
      );

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public static async blockUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.body.userId;
      const blockedUserId = req.body.blockedUserId;
      const blockedUser = await UserService.blockUser(userId, blockedUserId);

      return res.json(blockedUser);
    } catch (e) {
      next(e);
    }
  }

  public static async unblockUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.body.userId;
      const blockedUserId = req.body.blockedUserId;
      const unblockedUser = await UserService.unblockUser(
        userId,
        blockedUserId
      );

      return res.json(unblockedUser);
    } catch (e) {
      next(e);
    }
  }

  public static async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const args = req.query;
      const limit = req.query.limit;
      const users = await UserService.getAllUsers(args, +limit);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}
