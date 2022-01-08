import { UserModel } from "../../models/user-model";
import { UserDto } from "../../dtos/user-dto";

export class AdminEditUserService {
  public static async editUser(userId: string, { ...args }: Object) {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...args });

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}
