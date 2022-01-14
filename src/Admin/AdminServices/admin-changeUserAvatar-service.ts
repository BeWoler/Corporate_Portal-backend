import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";
import mongoose from "mongoose";

export class AdminChangeUserAvatarService {
  public static async save(userId: mongoose.ObjectId, avatarUrl: string) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { avatar: avatarUrl }
    );

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
