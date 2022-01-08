import { AdminEditUserService } from "../AdminServices/admin-editUser-service";

export class AdminEditUserController {
  public static async editUser(req, res, next) {
    try {
      const userId = req.body.userId;
      const userInfo = req.body.userInfo;
      const userData = await AdminEditUserService.editUser(userId, {
        ...userInfo,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
