import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: string;
  author: string;
  text: string;
  likes: mongoose.ObjectId[];
  time: object;
  file: string;
  comments: object[];
}

const postSchema = new Schema<Post>({
  user: { type: String, ref: "User" },
  author: { type: String, required: true },
  text: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  time: { type: Object },
  file: { type: String },
  comments: [{ type: Object }],
});

export const PostModel = model<Post>("Post", postSchema);
