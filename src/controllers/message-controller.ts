import { MessageService } from "../services/message-service";
import * as express from "express";

const ObjectId = require("mongodb").ObjectId;

export class MessageController {
  public static async message(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { conversationId, sender, text } = req.body;
      const message = await MessageService.message(
        conversationId,
        sender,
        text
      );
      return res.status(200).json(message);
    } catch (e) {
      next(e);
    }
  }

  public static async getMessages(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const messages = await MessageService.getMessages(
        new ObjectId(req.params.conversationId)
      );
      return res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }
}
