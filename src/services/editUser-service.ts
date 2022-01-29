import { UserModel } from "../models/user-model";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";
import mongoose from "mongoose";

export class EditUserService {
  public static async editUser(userId: mongoose.ObjectId, { ...args }: Object) {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...args });

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
