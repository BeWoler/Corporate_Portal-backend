import { Schema, model, Date } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: mongoose.ObjectId;
  text: string;
  time: object;
  file: string;
  likes: any;
  comments: any;
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  time: { type: Date },
  file: { type: String },
  likes: { type: Array, ref: "Like" },
  comments: { type: Array, ref: "Comment" },
});

export const PostModel = model<Post>("Post", postSchema);
