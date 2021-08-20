import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function list() {
  const repository = getRepository(User);
  const result = await repository.find();

  if (!result) {
    return {
      status: 404,
      response: { entity: "user", data: `NOT FOUND / no user(s) stored` },
    };
  }

  return { status: 200, response: { entity: "user", data: result } };
}
