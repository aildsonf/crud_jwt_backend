import { Router } from "express";
// local imports
import authRouter from "./auth.routes";
import userRouter from "./users.routes";

const router: Router = Router();

router.use("/api", authRouter);
router.use("/api", userRouter);

export default router;
