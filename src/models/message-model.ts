import { Schema, model } from "mongoose";

interface Message {
  conversationId: string;
  sender: string;
  text: string;
}

const messageSchema = new Schema<Message>({
  conversationId: { type: String },
  sender: { type: String },
  text: { type: String },
});

export const MessageModel = model<Message>("Message", messageSchema);
