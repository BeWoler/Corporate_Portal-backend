import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Message {
  conversationId: mongoose.ObjectId;
  sender: mongoose.ObjectId;
  text: string;
  date: object;
}

const messageSchema = new Schema<Message>({
  conversationId: { type: Schema.Types.ObjectId },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  date: { type: Date },
});

export const MessageModel = model<Message>("Message", messageSchema);
