import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";

interface Like {
  user: mongoose.ObjectId;
  post: mongoose.ObjectId;
  like: number;
}

const likeSchema = new Schema<Like>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  like: { type: Number, default: 1 },
});

export const LikeModel = model<Like>("Like", likeSchema);
