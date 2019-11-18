import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class DropNameColumn1574081862607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'name');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('user', new TableColumn({
            name: "name",
            type: "varChar",
            default: "newName",
            isNullable: false
        }));
    }

}
