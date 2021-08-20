import { getRepository } from "typeorm";
// local imports
import Contact from "../../models/Contact";

export default async function destroy(id: string) {
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

  await repository.delete(id);
  return {
    status: 200,
    response: {
      entity: "contact",
      data: `SUCCESS / contact with id <${id}> was destroyed`,
    },
  };
}
