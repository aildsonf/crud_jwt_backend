import _ from "lodash";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
// local imports
import Account from "../../models/Account";

export default async function create(account: Account) {
  const repository = getRepository(Account);
  const exists = await repository.find({ where: { login: account.login } });

  if (!_.isEmpty(exists)) {
    return {
      status: 409,
      response: {
        entity: "account",
        data: `CONFLICT / account with login <${account.login}> already stored`,
      },
    };
  }

  let hash = bcrypt.hashSync(account.password, 8);
  account.password = hash;
  account.status = String(process.env.ACCOUNT_STATUS_ACTIVE);
  const { id } = await repository.save(account);

  let result = await repository.findOne(id);
  return { status: 201, response: { entity: "account", data: result } };
}
