import { getRepository } from "typeorm";
// local imports
import Contact from "../../models/Contact";

export default async function update(id: string, data: Contact) {
  const repository = getRepository(Contact);
  const exists = repository.findOne(id);

  if (!exists) {
    return {
      status: 404,
      response: {
        entity: "contact",
        data: `NOT FOUND / no contact stored with id <${id}>`,
      },
    };
  }

  await repository.update(id, data);
  let result = await repository.findOne(id);
  return { status: 200, response: { entity: "contact", data: result } };
}
