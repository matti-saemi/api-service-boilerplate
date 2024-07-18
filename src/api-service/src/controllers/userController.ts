import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";

class UserRouter {
  static async getUserRoute(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await UserService.getUser(Number.parseInt(userId));
      res.status(200).json(user)
    } catch(err: any) {
      res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      });
    }
  }
}

export default UserRouter;
