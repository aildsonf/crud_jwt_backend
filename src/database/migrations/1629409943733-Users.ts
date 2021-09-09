import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from "dotenv";
// local imports
import User from "../../models/User";

dotenv.config();
if (!process.env.ACCOUNT_STATUS_ACTIVE) {
  process.exit(1);
}
const status_active = process.env.ACCOUNT_STATUS_ACTIVE;

export class Users1629409943733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let user = new User();
    user.login = "admin";
    user.password = "admin";
    user.status = status_active;
    await user.encryptPassword();

    const repository = getRepository(User);
    await repository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("User");
  }
}
