import { Schema, model } from "mongoose";

const conversationSchema = new Schema({
  members: { type: Array, ref: "User" },
});

export const ConversationModel = model("Conversation", conversationSchema);
