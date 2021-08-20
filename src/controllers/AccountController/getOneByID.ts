import { getRepository } from "typeorm";
// local imports
import Account from "../../models/Account";

export default async function getOneByID(id: string) {
  const repository = getRepository(Account);
  const result = await repository.findOne(id);

  if (!result) {
    return {
      status: 404,
      response: {
        entity: "account",
        data: `NOT FOUND / no account stored with id <${id}>`,
      },
    };
  }

  return { status: 200, response: { entity: "account", data: result } };
}
