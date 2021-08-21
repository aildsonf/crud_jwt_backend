import { Request, Response } from "express";
import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function destroy(req: Request, res: Response) {
  console.log("DELETE /users");

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

  try {
    await repository.remove(user);
  } catch (e) {
    return res
      .status(500)
      .send(`INTERNAL SERVER ERROR / failed to remove user`);
  }

  return res.status(200).json({
    message: `SUCCESS / user with id <${id}> was successfully removed`,
  });
}
