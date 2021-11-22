import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: mongoose.ObjectId;
  post: object;
  likes: number;
  comments: object;
}

const schema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Object, required: true },
  likes: { type: Number, default: 0 },
  comments: {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
});

export const PostModel = model<Post>("Post", schema);
