import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Comment {
  post: mongoose.ObjectId;
  author: string;
  time: object;
  text: string;
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  author: { type: String, required: true },
  time : { type: Object },
  text: { type: String, required: true },
});

export const CommentModel = model<Comment>("Comment", commentSchema);
