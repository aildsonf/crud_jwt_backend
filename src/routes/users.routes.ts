import { Request, Response, Router } from "express";
// local imports
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth";

const userRouter: Router = Router();

userRouter.get(
  "/users/:id([0-9]+)",
  [authMiddleware],
  UserController.getOneByID
);

userRouter.get("/users", [authMiddleware], UserController.list);

userRouter.post("/users", [authMiddleware], UserController.create);

userRouter.put("/users/:id([0-9]+)", [authMiddleware], UserController.update);

userRouter.patch(
  "/users/activate/:id([0-9]+)",
  [authMiddleware],
  UserController.activate
);

userRouter.patch(
  "/users/deactivate/:id([0-9]+)",
  [authMiddleware],
  UserController.deactivate
);

userRouter.patch(
  "/users/block/:id([0-9]+)",
  [authMiddleware],
  UserController.block
);

userRouter.delete(
  "/users/:id([0-9]+)",
  [authMiddleware],
  UserController.destroy
);

export default userRouter;
