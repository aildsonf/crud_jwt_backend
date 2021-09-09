import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as validator from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
// local imports
import User from "../../models/User";

export default async function update(req: Request, res: Response) {
  console.log("PUT /users");

  const id = req.params.id;
  let { login, name, birthday, cpf, mothers_name, email, phone } = req.body;
  let user = new User();
  user.login = login;
  user.name = name;
  user.birthday = birthday;
  user.cpf = cpf;
  user.mothers_name = mothers_name;
  user.email = email;
  user.phone = phone;

  if (!(login && name && birthday && cpf && mothers_name && email && phone)) {
    return res.status(412).json({
      message:
        "PRECONDITION FAILED / you MUST send data in order to update an existing user",
    });
  }

  if (!validator.cpf.isValid(cpf)) {
    return res
      .status(412)
      .json({ message: `PRECONDITION FAILED / cpf <${cpf}> is not valid` });
  }
  if (!EmailValidator.validate(email)) {
    return res
      .status(412)
      .json({ message: `PRECONDITION FAILED / email <${email}> is not valid` });
  }

  const repository = getRepository(User);

  try {
    user = await repository.findOneOrFail(id);
  } catch (e) {
    return res.status(404).json({
      message: `NOT FOUND / user with id <${id}> was not found in system`,
    });
  }

  try {
    await repository.update(id, {
      login,
      name,
      birthday,
      cpf,
      mothers_name,
      email,
      phone,
    });
  } catch (e) {
    return res
      .status(409)
      .send(
        `CONFLICT / user with login <${login}> or CPF <${cpf}> is already stored in system`
      );
  }

  return res.status(200).json({
    message: `SUCCESS / user with id <${id}> was successfully updated`,
  });
}
