import _ from "lodash";
import { getRepository } from "typeorm";
// local imports
import Contact from "../../models/Contact";
import Validator from "../../lib/validator";

export default async function create(contact: Contact) {
  const repository = getRepository(Contact);

  const validator = new Validator();
  validator.validateEmail(contact.email);

  const exists = await repository.find({
    where: [{ email: contact.email }, { phone: contact.phone }],
  });

  if (!_.isEmpty(exists)) {
    return {
      status: 409,
      response: {
        entity: "contact",
        data: `CONFLICT / contact with email <${contact.email}> and/or phone <${contact.phone}> already stored`,
      },
    };
  }

  const { id } = await repository.save(contact);

  let result = await repository.findOne(id);
  return { status: 201, response: { entity: "contact", data: result } };
}
