import { ConversationModel } from "../models/conversation-model";
import mongoose from "mongoose";

export class ConversationService {
  public static async conversation(
    senderId: mongoose.ObjectId,
    receiverId: mongoose.ObjectId
  ) {
    const candidateSender = await ConversationModel.findOne({
      members: [senderId, receiverId],
    });
    const candidateReceiver = await ConversationModel.findOne({
      members: [receiverId, senderId],
    });
    const found = candidateReceiver || candidateSender;
    if (found) {
      return null;
    }
    const newConversation = await ConversationModel.create({
      members: [senderId, receiverId],
    });
    return newConversation;
  }

  public static async deleteConversation(conversationId: mongoose.ObjectId) {
    const conversation = await ConversationModel.findOneAndDelete({
      _id: conversationId,
    });
    return conversation;
  }

  public static async getConversations(userId: mongoose.ObjectId) {
    const conversation = await ConversationModel.find({
      members: { $in: [userId] },
    }).populate("members");

    return conversation;
  }
}
