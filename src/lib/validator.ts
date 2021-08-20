import { cpf } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";

export default class Validator {
  validateCPF(cpfNumber: string) {
    if (!cpf.isValid(cpfNumber)) {
      return {
        response: {
          entity: "contact",
          data: `PRECONDITION FAILED / cpf <${cpfNumber}> is NOT VALID`,
        },
      };
    }
  }

  validateEmail(email: string) {
    if (!EmailValidator.validate(email)) {
      return {
        response: {
          entity: "contact",
          data: `PRECONDITION FAILED / email <${email}> is NOT VALID`,
        },
      };
    }
  }
}
