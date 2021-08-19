import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1629358844829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            generationStrategy: "increment",
            default: "1",
          },
          { name: "name", type: "varchar", isNullable: false },
          { name: "cpf", type: "varchar", isNullable: false },
          { name: "birthday", type: "date", isNullable: false },
          { name: "mothers_name", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
