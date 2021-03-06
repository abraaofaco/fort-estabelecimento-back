import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEstablishmentAddresses1616261908415
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "establishment_addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "establishment_id",
            type: "uuid",
          },
          {
            name: "address",
            type: "varchar(300)",
          },
          {
            name: "number",
            type: "varchar(10)",
            isNullable: true,
          },
          {
            name: "district",
            type: "varchar(100)",
          },
          {
            name: "city",
            type: "varchar(100)",
          },
          {
            name: "state",
            type: "varchar(100)",
          },
          {
            name: "country",
            type: "varchar(100)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "establishments",
            referencedColumnNames: ["id"],
            columnNames: ["establishment_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("establishment_addresses");
  }
}
