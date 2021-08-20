import { getRepository } from "typeorm";
// local imports
import Contact from "../../models/Contact";

export default async function list() {
  const repository = getRepository(Contact);
  const result = await repository.find();

  if (!result) {
    return {
      status: 404,
      response: { entity: "contact", data: `NOT FOUND / no user(s) stored` },
    };
  }

  return { status: 200, response: { entity: "contact", data: result } };
}
