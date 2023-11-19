import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1700380147729 implements MigrationInterface {
    name = 'Initial1700380147729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Scrutiny" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "votesPartyA" integer NOT NULL, "votesPartyB" integer NOT NULL, "votesTotal" integer NOT NULL, "blank" integer NOT NULL, "impugned" integer NOT NULL, "command" integer NOT NULL, "appealed" integer NOT NULL, "challengedIdentity" integer NOT NULL, "nullVotes" integer NOT NULL, "uid" character varying NOT NULL, "establishmentId" character varying NOT NULL, "sectionId" character varying NOT NULL, "subsectionId" character varying NOT NULL, "circuitId" character varying NOT NULL, "districtId" character varying NOT NULL, CONSTRAINT "PK_0f8146afa412fc89ebda757125e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5085268b6df9480b57e201143" ON "Scrutiny" ("uid") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bf6a75ae30839c00e769e37d6" ON "Scrutiny" ("establishmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8c40f012a61426131632a1e44" ON "Scrutiny" ("sectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b5192f47cf75b9c17d6dd3fbe" ON "Scrutiny" ("subsectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_56aa028d19a9cea5b99a6966d5" ON "Scrutiny" ("circuitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_70b58f75811a75a278e23bed96" ON "Scrutiny" ("districtId") `);
        await queryRunner.query(`CREATE TABLE "VotingTable" ("id" character varying NOT NULL, "uuid" character varying NOT NULL, "establishmentId" character varying NOT NULL, "sectionId" character varying NOT NULL, "subsectionId" character varying NOT NULL, "circuitId" character varying NOT NULL, "districtId" character varying NOT NULL, CONSTRAINT "PK_9502a1ee46e5b37fe84c8537911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_69cefde2b37141ba6bcd0f9ceb" ON "VotingTable" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9501590532cdbc31e6e5387d" ON "VotingTable" ("establishmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a52dbef3245cab3b2e6904dd52" ON "VotingTable" ("sectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64f44da9bce7bdedca64d1a8c0" ON "VotingTable" ("subsectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd7467d728af1b28c9424435df" ON "VotingTable" ("circuitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_579e5961c9c3b62bc4503c8d21" ON "VotingTable" ("districtId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_579e5961c9c3b62bc4503c8d21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd7467d728af1b28c9424435df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f44da9bce7bdedca64d1a8c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a52dbef3245cab3b2e6904dd52"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c9501590532cdbc31e6e5387d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69cefde2b37141ba6bcd0f9ceb"`);
        await queryRunner.query(`DROP TABLE "VotingTable"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70b58f75811a75a278e23bed96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56aa028d19a9cea5b99a6966d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b5192f47cf75b9c17d6dd3fbe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8c40f012a61426131632a1e44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bf6a75ae30839c00e769e37d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5085268b6df9480b57e201143"`);
        await queryRunner.query(`DROP TABLE "Scrutiny"`);
    }

}
