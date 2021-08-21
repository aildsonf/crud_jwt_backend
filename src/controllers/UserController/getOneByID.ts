import { Request, Response } from "express";
import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function getOneByID(req: Request, res: Response) {
  console.log("GET /users");

  const repository = getRepository(User);

  const id = req.params.id;

  try {
    const result = await repository.findOneOrFail(id, {
      select: [
        "id",
        "login",
        "name",
        "cpf",
        "birthday",
        "mothers_name",
        "email",
        "phone",
        "status",
      ],
    });
    return res.status(200).json(result);
  } catch (e) {
    return res
      .status(404)
      .json({ message: `NOT FOUND / no user found with id <${id}>` });
  }
}
