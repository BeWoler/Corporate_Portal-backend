import { MessageModel } from "../models/message-model";

export class MessageService {
  public static async message(
    conversationId: string,
    sender: string,
    text: string
  ) {
    const message = await MessageModel.create({
      conversationId,
      sender,
      text,
    });
    return message;
  }

  public static async getMessages(conversationId: string) {
    const messages = await MessageModel.find({ conversationId }).populate('sender');
    return messages;
  }
}
