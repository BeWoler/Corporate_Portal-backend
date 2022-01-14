import { MessageModel } from "../models/message-model";
import mongoose from "mongoose";

export class MessageService {
  public static async message(
    conversationId: mongoose.ObjectId,
    sender: mongoose.ObjectId,
    text: string
  ) {
    const message = await MessageModel.create({
      conversationId,
      sender,
      text,
      date: new Date(),
    });
    return message.populate("sender");
  }

  public static async getMessages(conversationId: mongoose.ObjectId) {
    const messages = await MessageModel.find({ conversationId }).populate(
      "sender"
    );
    return messages;
  }
}
