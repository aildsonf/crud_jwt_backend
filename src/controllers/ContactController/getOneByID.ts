import { getRepository } from "typeorm";
// local imports
import Contact from "../../models/Contact";

export default async function getOneByID(id: string) {
  const repository = getRepository(Contact);
  const result = await repository.findOne(id);

  if (!result) {
    return {
      status: 404,
      response: {
        entity: "contact",
        data: `NOT FOUND / no contact stored with id <${id}>`,
      },
    };
  }

  return { status: 200, response: { entity: "contact", data: result } };
}
