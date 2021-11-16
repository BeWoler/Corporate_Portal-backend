import { UserModel } from "../models/user-model";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";

export class ChangePasswordService {
  public static async edit(username: string, password: string) {
    const candidateToChange = await UserModel.findOne({ username });
    const isPassEqu = await bcrypt.compare(
      password,
      candidateToChange.password
    );
    if (isPassEqu) {
      throw ApiError.BadRequest("Incorrect password", [
        { message: "The old password cannot be equal to the new password" },
      ]);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.findOneAndUpdate(
      { username },
      { password: hashPassword }
    );

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
