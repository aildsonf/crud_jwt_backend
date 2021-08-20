import { Router } from "express";
// local imports
import authRouter from "./auth.routes";
import accountRouter from "./account.routes";
import userRouter from "./user.routes";
import contactRouter from "./contact.routes";

const router: Router = Router();

router.use("/api", authRouter);
router.use("/api", accountRouter);
router.use("/api", userRouter);
router.use("/api", contactRouter);

export default router;
