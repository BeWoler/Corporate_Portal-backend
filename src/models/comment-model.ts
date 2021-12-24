import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Comment {
  post: mongoose.ObjectId;
  user: mongoose.ObjectId;
  author: string;
  avatar: string;
  time: object;
  text: string;
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: String, required: true },
  avatar: { type: String },
  time : { type: Object },
  text: { type: String, required: true },
});

export const CommentModel = model<Comment>("Comment", commentSchema);
