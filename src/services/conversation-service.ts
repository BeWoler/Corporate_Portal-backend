import { ConversationModel } from "../models/conversation-model";

export class ConversationService {
  public static async conversation(senderId: string, receiverId: string) {
    const conversation = await ConversationModel.findOne({
      $in: { members: { senderId, receiverId } },
    });
    if (conversation) {
      return null;
    }
    const newConversation = await ConversationModel.create({
      members: [senderId, receiverId],
    });
    return newConversation;
  }

  public static async getConversations(userId: string) {
    const conversation = await ConversationModel.find({
      members: { $in: [userId] },
    }).populate("members");
    return conversation;
  }
}
