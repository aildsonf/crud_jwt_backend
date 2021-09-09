import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
// local imports
import User from "../../models/User";

export default async function changePassword(req: Request, res: Response) {
  const id = res.locals.jwtPayload.userId;

  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    return res
      .status(400)
      .json({ message: `BAD REQUEST / you MUST provide passwords` });
  }

  const repository = getRepository(User);
  let user = new User();
  try {
    user = await repository.findOneOrFail(id);
  } catch (id) {
    return res
      .status(401)
      .json({ message: `UNAUTHORIZED / not found login <${id}> in system` });
  }

  if (!user.isPasswordValid(oldPassword)) {
    return res
      .status(401)
      .json({ message: `UNAUTHORIZED / invalid password <${oldPassword}>` });
  }

  user.password = newPassword;
  user.encryptPassword();
  repository.save(user);

  return res
    .status(200)
    .json({ message: "SUCCESS / your password was successfully updated" });
}
