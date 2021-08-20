import _ from "lodash";
import { getRepository } from "typeorm";
import Validator from "../../lib/validator";
// local imports
import User from "../../models/User";

export default async function create(user: User) {
  const repository = getRepository(User);

  const validator = new Validator();
  validator.validateCPF(user.cpf);

  const exists = await repository.find({ where: { cpf: user.cpf } });

  if (!_.isEmpty(exists)) {
    return {
      status: 409,
      response: {
        entity: "user",
        data: `CONFLICT / user with CPF <${user.cpf}> already stored`,
      },
    };
  }

  const { id } = await repository.save(user);

  let result = await repository.findOne(id);
  return { status: 201, response: { entity: "user", data: result } };
}
