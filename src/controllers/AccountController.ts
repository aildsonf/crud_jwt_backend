import { getRepository } from "typeorm";
// local imports
import Account from "../models/Account";
import { IAccount } from "../interfaces/IAccount";

async function findOne(account: IAccount) {
  const repository = getRepository(Account);
  return repository.findOne();
}

async function list(account: IAccount) {
  const repository = getRepository(Account);
  return repository.find();
}

async function create(account: IAccount) {
  const repository = getRepository(Account);
  return repository.save(account);
}

async function update(account: IAccount) {
  const repository = getRepository(Account);
  return repository.save(account);
}

async function activate(account: IAccount) {
  const repository = getRepository(Account);
  return repository.save(account);
}

async function deactivate(account: IAccount) {
  const repository = getRepository(Account);
  return repository.save(account);
}

async function block(account: IAccount) {
  const repository = getRepository(Account);
  return repository.save(account);
}

export default {
  findOne,
  list,
  create,
  update,
  activate,
  deactivate,
  block,
};
