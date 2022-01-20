import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";
import mongoose from "mongoose";

export class UserService {
  public static async getUserInfo(userId: mongoose.ObjectId) {
    const user = await UserModel.findOne({ _id: userId }).populate("friends");

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }

  public static async blockUser(
    userId: mongoose.ObjectId,
    blockedUserId: mongoose.ObjectId
  ) {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { blockedUser: blockedUserId } }
    );

    return blockedUserId;
  }

  public static async unblockUser(
    userId: mongoose.ObjectId,
    blockedUserId: mongoose.ObjectId
  ) {
    const user = await UserModel.findOne({ _id: userId });

    await user.blockedUser.pull(blockedUserId);
    await user.save();

    return blockedUserId;
  }

  public static async getAllUsers(args?: object) {
    const users = await UserModel.find(args);
    return users;
  }
}
