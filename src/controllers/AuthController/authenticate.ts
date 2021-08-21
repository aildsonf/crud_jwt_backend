import { getRepository } from "typeorm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// local imports
import User from "../../models/User";

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.exit(1);
}
const jwtSecret = process.env.JWT_SECRET;

export default async function authenticate(req: Request, res: Response) {
  let { login, password } = req.body;

  if (!(login && password)) {
    return res.status(400).json({
      message: "BAD REQUEST / you MUST provide credentials to authenticate",
    });
  }

  const repository = getRepository(User);
  let user = new User();

  try {
    user = await repository.findOneOrFail({ where: { login } });
  } catch (e) {
    return res
      .status(401)
      .json({ message: `UNAUTHORIZED / not found login <${login}> in system` });
  }

  if (!user.isPasswordValid(password)) {
    return res
      .status(401)
      .json({ message: `UNAUTHORIZED / invalid password <${password}>` });
  }

  if (!(user.status === process.env.ACCOUNT_STATUS_ACTIVE)) {
    return res.status(401).json({
      message: `UNAUTHORIZED / user <${login}> is not allowed to login`,
    });
  }

  const token = jwt.sign({ userId: user.id, login: user.login }, jwtSecret, {
    expiresIn: "1h",
  });

  return res.json({ token: token });
}
