import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";

export class UserService {
  public static async getUserInfo(userId: string) {
    const user = await UserModel.findOne({ _id: userId }).populate("friends");

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }

  public static async getAllUsers(args: object) {
    const users = await UserModel.find(args);
    return users;
  }
}
