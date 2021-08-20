import { getRepository } from "typeorm";
// local imports
import Account from "../../models/Account";

export default async function update(id: string, data: Account) {
  const repository = getRepository(Account);
  const exists = repository.findOne(id);

  if (!exists) {
    return {
      status: 404,
      response: {
        entity: "account",
        data: `NOT FOUND / no account stored with id <${id}>`,
      },
    };
  }

  await repository.update(id, data);
  let result = await repository.findOne(id);
  return { status: 200, response: { entity: "account", data: result } };
}
