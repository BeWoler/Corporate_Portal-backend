import { PostModel } from "../../models/post-model";
import { UserModel } from "../../models/user-model";
import { LikeModel } from "../../models/like-model";
import { CommentModel } from "../../models/comment-model";
import { ConversationModel } from "../../models/conversation-model";
import { UserPasswordModel } from "../../models/userpassword-model";
import mongoose from "mongoose";

export class AdminDeleteUserService {
  public static async delete(userId: mongoose.ObjectId) {
    const user = await UserModel.deleteOne({ _id: userId });
    const posts = await PostModel.deleteMany({ user: userId });
    const userPassword = await UserPasswordModel.deleteOne({ user: userId });
    const comments = await CommentModel.deleteMany({ user: userId });
    const likes = await LikeModel.deleteMany({ user: userId });
    const conversations = await ConversationModel.deleteMany({
      members: userId,
    });
    return { user, posts, userPassword, comments, likes, conversations };
  }
}
