import { LikeModel } from "../models/like-model";
import mongoose from "mongoose";

export class LikeService {
  public static async like(post: mongoose.ObjectId, user: mongoose.ObjectId) {
    const candidateLike = await LikeModel.findOne({ post, user });
    if (candidateLike) {
      const like = await LikeModel.deleteOne({ post });
      return like;
    }
    const like = await LikeModel.create({
      user,
      post,
    });

    return like;
  }
}
