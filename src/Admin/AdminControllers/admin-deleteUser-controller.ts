import { AdminDeleteUserService } from "../AdminServices/admin-deleteUser-service";
import * as express from "express";

export class AdminDeleteUserController {
  public static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userId } = req.body;
      const userData = await AdminDeleteUserService.delete(userId);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}
