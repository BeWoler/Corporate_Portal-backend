import { Schema, model } from "mongoose";

interface Message {
  conversationId: string;
  sender: string;
  text: string;
  date: object;
}

const messageSchema = new Schema<Message>({
  conversationId: { type: String },
  sender: { type: String, ref: "User" },
  text: { type: String },
  date: { type: Date },
});

export const MessageModel = model<Message>("Message", messageSchema);
