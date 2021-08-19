import { Request, Response, Router } from "express";
// local imports
import AuthController from "../controllers/AuthController";

const authRouter: Router = Router();

authRouter.post("/auth", (req: Request, res: Response) => {
  console.log("POST /api/auth");
  AuthController.authenticate(req.body)
    .then((payload) => res.send(payload))
    .catch((err) => res.send(err));
});

export default authRouter;
