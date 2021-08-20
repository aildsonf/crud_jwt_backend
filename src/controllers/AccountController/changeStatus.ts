import { getRepository } from "typeorm";
// local imports
import Account from "../../models/Account";

export default async function changeStatus(id: string, account_status: string) {
  const repository = getRepository(Account);
  const account = await repository.findOne(id);

  if (!account) {
    return {
      status: 404,
      response: {
        entity: "account",
        data: `NOT FOUND / account with id <${id}>`,
      },
    };
  }
  if (account.status === account_status) {
    return {
      status: 412,
      response: {
        entity: "account",
        data: `PRECONDITION FAILED / account with id <${id}> is already <${account_status}>`,
      },
    };
  }

  await repository.update(id, {
    status: account_status,
  });
  let result = await repository.findOne(id);
  return { status: 200, response: { entity: "account", data: result } };
}
