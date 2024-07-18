import express, { Request, Response } from "express";
import { jwtAuthMiddleware } from "../middlewares/authentication";
import UserRouter from "./userController";
import Validation from "./validation";

const router = express.Router();

router.get("/auth/health", (req: Request, res: Response) => {
  res.send({ status: "OK" });
});
router.get(
  "/auth/users/:userId",
  Validation.userIdInParamValidation,
  Validation.checkValidation,
  UserRouter.getUserRoute
);

export default router;
