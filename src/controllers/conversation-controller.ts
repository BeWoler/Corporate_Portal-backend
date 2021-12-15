import { ConversationService } from "../services/conversation-service";

export class ConversetionController {
  public static async conversation(req, res, next) {
    try {
      const conversation = await ConversationService.conversation(
        req.body.senderId,
        req.body.receiverId
      );
      const savedConversation = await conversation.save();
      return res.status(200).json(savedConversation);
    } catch (e) {
      next(e);
    }
  }

  public static async getConversations(req, res, next) {
    try {
      const conversations = await ConversationService.getConversations(
        req.params.userId
      );
      return res.status(200).json(conversations);
    } catch (e) {
      next(e);
    }
  }
}
