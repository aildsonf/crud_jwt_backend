import { Request, Response } from "express";
import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function list(req: Request, res: Response) {
  console.log("GET /users");

  const repository = getRepository(User);
  const result = await repository.find({
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

  if (!result) {
    return res
      .status(404)
      .json({ message: "NOT FOUND / no user(s) found in system" });
  }

  return res.status(200).json(result);
}
