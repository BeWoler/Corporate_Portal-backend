import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Comment {
  post: mongoose.ObjectId;
  user: mongoose.ObjectId;
  time: object;
  text: string;
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  time : { type: Object },
  text: { type: String, required: true },
});

export const CommentModel = model<Comment>("Comment", commentSchema);
