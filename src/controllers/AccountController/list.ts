import { getRepository } from "typeorm";
// local imports
import Account from "../../models/Account";

export default async function list(account_status: string) {
  const repository = getRepository(Account);
  const result = await repository.find({ where: { status: account_status } });

  if (!result) {
    return {
      status: 404,
      response: {
        entity: "account",
        data: `NOT FOUND / no account(s) stored with status <${account_status}>`,
      },
    };
  }

  return { status: 200, response: { entity: "account", data: result } };
}
