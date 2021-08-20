import { getRepository } from "typeorm";
// local imports
import User from "../../models/User";

export default async function update(id: string, data: User) {
  const repository = getRepository(User);
  const exists = repository.findOne(id);

  if (!exists) {
    return {
      status: 404,
      response: {
        entity: "user",
        data: `NOT FOUND / no user stored with id <${id}>`,
      },
    };
  }

  await repository.update(id, data);
  let result = await repository.findOne(id);
  return { status: 200, response: { entity: "user", data: result } };
}
