import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// local imports
import { IAccount } from "../interfaces/IAccount";
import Account from "../models/Account";

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.exit(1);
}
const jwt_secret = String(process.env.JWT_SECRET);

async function authenticate(accountObj: IAccount) {
  const repository = getRepository(Account);
  const { login, password } = accountObj;
  const account: any = repository.findOne({ where: { login } });
  const isPasswordValid = await bcrypt.compare(password, account.password);

  if (!account) {
    // unauthorized 401
  }
  if (!isPasswordValid) {
    // unauthorized 401
  }

  const token = jwt.sign({ id: account.id }, jwt_secret, { expiresIn: "1d" });
  delete account.password;

  return { account, token };
}

export default { authenticate };
