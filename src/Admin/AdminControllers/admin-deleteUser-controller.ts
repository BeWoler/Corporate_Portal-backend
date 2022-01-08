import { AdminDeleteUserService } from "../AdminServices/admin-deleteUser-service";

export class AdminDeleteUserController {
  public static async delete(req, res, next) {
    try {
      const { userId } = req.body;
      const userData = await AdminDeleteUserService.delete(userId);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
