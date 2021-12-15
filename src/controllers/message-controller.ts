import { MessageService } from "../services/message-service";

export class MessageController {
  public static async message(req, res, next) {
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

  public static async getMessages(req, res, next) {
    try {
      const messages = await MessageService.getMessages(
        req.params.conversationId
      );
      return res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }
}
