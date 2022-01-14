import { AdminEditUserService } from "../AdminServices/admin-editUser-service";
import * as express from "express";

export class AdminEditUserController {
  public static async editUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
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
