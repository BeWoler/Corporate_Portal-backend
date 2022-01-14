import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";
import mongoose from "mongoose";

export class AdminEditUserService {
  public static async editUser(userId: mongoose.ObjectId, { ...args }: Object) {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...args });

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
