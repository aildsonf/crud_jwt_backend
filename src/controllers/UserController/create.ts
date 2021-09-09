import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as validator from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import * as dotenv from "dotenv";
// local imports
import User from "../../models/User";

dotenv.config();
if (!process.env.ACCOUNT_STATUS_ACTIVE) {
  process.exit(1);
}
const status_active = process.env.ACCOUNT_STATUS_ACTIVE;

export default async function create(req: Request, res: Response) {
  console.log("POST /users");

  let { login, password, name, birthday, cpf, mothers_name, email, phone } =
    req.body;
  let user = new User();
  user.login = login;
  user.password = password;
  user.encryptPassword();
  user.name = name;
  user.birthday = birthday;
  user.cpf = cpf;
  user.mothers_name = mothers_name;
  user.email = email;
  user.phone = phone;
  user.status = status_active;

  if (
    !(
      login &&
      password &&
      name &&
      birthday &&
      cpf &&
      mothers_name &&
      email &&
      phone
    )
  ) {
    return res
      .status(412)
      .json({
        message:
          "PRECONDITION FAILED / you MUST send data in order to create a new user",
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
    await repository.save(user);
  } catch (e) {
    return res.status(409).json({
      message: `CONFLICT / user with login <${login}> or CPF <${cpf}> is already stored in system`,
    });
  }

  return res.status(201).json({
    message: `CREATED / user with login <${login}> was successfully created in system`,
  });
}
