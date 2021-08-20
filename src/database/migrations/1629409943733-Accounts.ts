import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Accounts1629409943733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!queryRunner.hasSchema("fcxlabs_project")) {
      await queryRunner.createSchema("fcxlabs_project");
    }

    await queryRunner.createTable(
      new Table({
        name: "accounts",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "login", type: "varchar", isNullable: false },
          { name: "password", type: "varchar", isNullable: false },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema("accounts");
  }
}
