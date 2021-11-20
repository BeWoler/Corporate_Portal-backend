import { UserModel } from "../models/user-model";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";

export class EditUserService {
  public static async editUser(username: string, { ...args }: Object) {
    const user = await UserModel.findOneAndUpdate({ username }, { ...args });

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
