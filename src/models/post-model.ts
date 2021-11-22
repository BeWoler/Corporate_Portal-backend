import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Post {
  user: mongoose.ObjectId;
  text: string;
  likes: number;
  comments: object;
}

const schema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
      likes: { type: Number, default: 0 },
    },
  ],
});

export const PostModel = model<Post>("Post", schema);
