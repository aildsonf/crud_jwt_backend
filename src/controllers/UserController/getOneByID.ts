import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function getOneByID(id: string) {
  const repository = getRepository(User);
  const result = await repository.findOne(id);

  if (!result) {
    return {
      status: 404,
      response: {
        entity: "user",
        data: `NOT FOUND / no user stored with id <${id}>`,
      },
    };
  }

  return { status: 200, response: { entity: "user", data: result } };
}
