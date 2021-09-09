import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.exit(1);
}
const jwtSecret = process.env.JWT_SECRET;

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = String(req.headers.authorization).replace("Bearer", "").trim();

  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    res.status(401).json({ message: "UNAUTHORIZED / token is NOT VALID" });
    return;
  }

  const { userId, login }: any = jwtPayload;

  const newToken = jwt.sign({ userId, login }, jwtSecret, {
    expiresIn: "1d",
  });
  res.setHeader("token", newToken);

  next();
}
