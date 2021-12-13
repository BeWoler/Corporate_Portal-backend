import { Schema, model } from "mongoose";

const conversationSchema = new Schema({
  members: { type: Array },
});

export const ConversationModel = model("Conversation", conversationSchema);
