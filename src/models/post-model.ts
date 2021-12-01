import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: mongoose.ObjectId;
  author: string;
  text: string;
  likes: object[];
  time: object;
  comments: object[];
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: String, required: true },
  text: { type: String, required: true },
  likes: [{ type: Object }],
  time: { type: Object },
  comments: [{ type: Object }],
});

export const PostModel = model<Post>("Post", postSchema);
