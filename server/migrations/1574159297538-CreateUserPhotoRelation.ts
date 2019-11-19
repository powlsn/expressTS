import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserPhotoRelation1574159297538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
