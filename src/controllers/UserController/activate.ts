import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as dotenv from "dotenv";
// local imports
import User from "../../models/User";

dotenv.config();
if (!process.env.ACCOUNT_STATUS_ACTIVE) {
  process.exit(1);
}
const status_active: string = process.env.ACCOUNT_STATUS_ACTIVE;

export default async function activate(req: Request, res: Response) {
  console.log("PATCH /users/activate");

  const id = req.params.id;

  const repository = getRepository(User);
  let user = new User();

  try {
    user = await repository.findOneOrFail(id);
  } catch (e) {
    return res.status(404).json({
      message: `NOT FOUND / user with id <${id}> was not found in system`,
    });
  }

  if (user.status === status_active) {
    return res.status(409).json({
      message: `CONFLICT / user with id <${id}> is already ACTIVE`,
    });
  }

  user.status = status_active;
  await repository.save(user);

  return res.status(200).json({
    message: `SUCCESS / user with id <${id}> was successfully ACTIVATED`,
  });
}
