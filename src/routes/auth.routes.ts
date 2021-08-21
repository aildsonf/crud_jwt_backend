import { Router } from "express";
// local imports
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/auth/login", AuthController.authenticate);
authRouter.post(
  "/forgot-password",
  [authMiddleware],
  AuthController.changePassword
);

export default authRouter;
