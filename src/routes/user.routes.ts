import { Request, Response, Router } from "express";
// local imports
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth";

const userRouter: Router = Router();

userRouter.get("/users/:id", (req: Request, res: Response) => {
  console.log(`GET /api/users/${req.params.id}`);
  // authMiddleware(req.headers);
  UserController.getOneByID(req.params.id)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

userRouter.get("/users", (req: Request, res: Response) => {
  console.log("GET /api/users");
  // authMiddleware(req.headers);
  UserController.list()
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

userRouter.post("/users", (req: Request, res: Response) => {
  console.log("POST /api/users");
  // authMiddleware(req.headers);
  UserController.create(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

userRouter.put("/users/:id", (req: Request, res: Response) => {
  console.log("PUT /api/users");
  // authMiddleware(req.headers);
  UserController.update(req.params.id, req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

export default userRouter;
