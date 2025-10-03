import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationUserReport1759459900616 implements MigrationInterface {
  name = 'AddRelationUserReport1759459900616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`,
    );
    await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "user_id"`);
  }
}
