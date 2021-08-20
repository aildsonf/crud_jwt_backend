import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class Contact1629409972388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!queryRunner.hasSchema("fcxlabs_project")) {
      await queryRunner.createSchema("fcxlabs_project");
    }

    await queryRunner.createTable(
      new Table({
        name: "contact",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "email", type: "varchar", isNullable: false },
          { name: "phone", type: "varchar", isNullable: false },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true
    );

    await queryRunner.addColumn(
      "contact",
      new TableColumn({
        name: "users_id",
        type: "int",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "contact",
      new TableForeignKey({
        columnNames: ["users_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("contact");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("users_id") !== -1
    );
    await queryRunner.dropForeignKey("contact", foreignKey!);
    await queryRunner.dropColumn("contact", "users_id");
    await queryRunner.dropTable("contact");
  }
}
