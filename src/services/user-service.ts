import { UserModel } from "../models/user-model";
import { UserDto } from "../dtos/user-dto";

export class UserService {
  public static async getUserInfo(userId: string) {
    const user = await UserModel.findOne({ _id: userId });

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
