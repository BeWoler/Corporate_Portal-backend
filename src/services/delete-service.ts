import { PostModel } from "../models/post-model";
import { UserModel } from "../models/user-model";
import { TokenService } from "./token-service";
import { LikeModel } from "../models/like-model";
import { CommentModel } from "../models/comment-model";
import { ConversationModel } from "../models/conversation-model";
import { UserPasswordModel } from "../models/userpassword-model";
import mongoose from "mongoose";

export class DeleteService {
  public static async delete(refreshToken: string, userId: mongoose.ObjectId) {
    const token = await TokenService.removeToken(refreshToken);
    const user = await UserModel.deleteOne({ _id: userId });
    const userPassword = await UserPasswordModel.deleteOne({ user: userId });
    const posts = await PostModel.deleteMany({ user: userId });
    const comments = await CommentModel.deleteMany({ user: userId });
    const likes = await LikeModel.deleteMany({ user: userId });
    const conversations = await ConversationModel.deleteMany({
      members: userId,
    });
    return { user, userPassword, posts, comments, likes, conversations, token };
  }
}
