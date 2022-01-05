import { UserModel } from "../models/user-model";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";
import { UserPasswordModel } from "../models/userpassword-model";

export class ChangePasswordService {
  public static async edit(
    username: string,
    newPassword: string,
    oldPassword: string
  ) {
    const candidateToChange = await UserModel.findOne({ username });
    const candidatePassword = await UserPasswordModel.findOne({
      user: candidateToChange._id,
    });
    const isOldPassEqu = await bcrypt.compare(
      oldPassword,
      candidatePassword.password
    );
    if (!isOldPassEqu) {
      throw ApiError.BadRequest("Incorrect old password", [
        { message: "Incorrect old password" },
      ]);
    }
    const isPassEqu = await bcrypt.compare(
      newPassword,
      candidatePassword.password
    );
    if (isPassEqu) {
      throw ApiError.BadRequest(
        "The old password cannot be equal to the new password",
        [{ message: "The old password cannot be equal to the new password" }]
      );
    }
    const hashPassword = await bcrypt.hash(newPassword, 3);
    await candidatePassword.update({ password: hashPassword });
    await candidatePassword.save();

    const userDto = new UserDto(candidateToChange);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
