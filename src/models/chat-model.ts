import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Chat {
  messages: string[];
  users: mongoose.ObjectId[];
}

const chatSchema = new Schema<Chat>({
  messages: [{ type: String }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const ChatModel = model<Chat>("chat", chatSchema);
