import { ConversationService } from "../services/conversation-service";
import * as express from "express";

const ObjectId = require("mongodb").ObjectId;

export class ConversetionController {
  public static async conversation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const conversation = await ConversationService.conversation(
        req.body.senderId,
        req.body.receiverId
      );

      return res.json(conversation);
    } catch (e) {
      next(e);
    }
  }

  public static async deleteConversation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { conversationId } = req.body;
      const conversation = await ConversationService.deleteConversation(
        conversationId
      );

      return res.json(conversation);
    } catch (e) {
      next(e);
    }
  }

  public static async getConversations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const conversations = await ConversationService.getConversations(
        new ObjectId(req.params.userId)
      );
      return res.json(conversations);
    } catch (e) {
      next(e);
    }
  }
}
