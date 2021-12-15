import { ConversationModel } from "../models/conversation-model";

export class ConversationService {
  public static async conversation(senderId: string, receiverId: string) {
    const newConversation = await ConversationModel.create({
      members: [senderId, receiverId],
    });
    return newConversation;
  }

  public static async getConversations(userId: string) {
    const conversation = await ConversationModel.find({
      members: { $in: [userId] },
    });
    return conversation;
  }
}
