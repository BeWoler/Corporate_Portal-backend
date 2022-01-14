import { FriendRequestService } from "../services/friendRequest-service";
import * as express from "express";

const ObjectId = require("mongodb").ObjectId;

export class FriendRequestController {
  public static async request(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { receiverId, senderId } = req.body;
      const request = await FriendRequestService.request(receiverId, senderId);

      return res.json(request);
    } catch (e) {
      next(e);
    }
  }

  public static async accept(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { receiverId, senderId, requestId } = req.body;
      const accept = await FriendRequestService.accept(
        receiverId,
        senderId,
        requestId
      );

      return res.json(accept);
    } catch (e) {
      next(e);
    }
  }

  public static async decline(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { requestId } = req.body;
      const decline = await FriendRequestService.decline(requestId);

      return res.json(decline);
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
      const { userId, friendId } = req.body;
      const deleteFriend = await FriendRequestService.delete(userId, friendId);

      return res.json(deleteFriend);
    } catch (e) {
      next(e);
    }
  }

  public static async getRequests(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const requests = await FriendRequestService.getRequests(
        new ObjectId(req.params.receiverId)
      );

      return res.json(requests);
    } catch (e) {
      next(e);
    }
  }
}
