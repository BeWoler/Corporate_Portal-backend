import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: mongoose.ObjectId;
  post: object;
  likes: number;
  comments: string;
}

const schema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Object },
  likes: { type: Number },
  comments: { type: String },
});

export const PostModel = model<Post>("Post", schema);
