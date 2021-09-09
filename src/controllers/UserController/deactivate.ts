import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as dotenv from "dotenv";
// local imports
import User from "../../models/User";

dotenv.config();
if (!process.env.ACCOUNT_STATUS_INACTIVE) {
  process.exit(1);
}
const status_inactive: string = process.env.ACCOUNT_STATUS_INACTIVE;

export default async function deactivate(req: Request, res: Response) {
  console.log("PATCH /users/deactivate");

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

  if (user.status === status_inactive) {
    return res.status(409).json({
      message: `CONFLICT / user with id <${id}> is already INACTIVE`,
    });
  }

  user.status = status_inactive;
  await repository.save(user);

  return res.status(200).json({
    message: `SUCCESS / user with id <${id}> was successfully DEACTIVATED`,
  });
}
