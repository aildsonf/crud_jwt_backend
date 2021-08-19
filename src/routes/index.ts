import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router: Router = Router();

router.use("/api", userRouter);
router.use("/api", authRouter);

export default router;
