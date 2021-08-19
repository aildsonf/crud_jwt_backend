import { getRepository } from "typeorm";
// local imports
import User from "../models/User";
import { IUser } from "../interfaces/IUser";

async function findOne(user: IUser) {
  const repository = getRepository(User);
  return repository.findOne();
}

async function list(user: IUser) {
  const repository = getRepository(User);
  return repository.find();
}

async function create(user: IUser) {
  const repository = getRepository(User);
  return repository.save(user);
}

async function update(user: IUser) {
  const repository = getRepository(User);
  return repository.save(user);
}

export default {
  findOne,
  list,
  create,
  update,
};
