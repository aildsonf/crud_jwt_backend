import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class Users1629409952975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!queryRunner.hasSchema("fcxlabs_project")) {
      await queryRunner.createSchema("fcxlabs_project");
    }

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
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

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "account_id",
        type: "int",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["account_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "accounts",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("account_id") !== -1
    );
    await queryRunner.dropForeignKey("users", foreignKey!);
    await queryRunner.dropColumn("users", "account_id");
    await queryRunner.dropTable("users");
  }
}
