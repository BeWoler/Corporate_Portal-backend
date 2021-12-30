import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Like {
  user: mongoose.ObjectId;
  post: mongoose.ObjectId;
}

const likeSchema = new Schema<Like>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

export const LikeModel = model<Like>("Like", likeSchema);
