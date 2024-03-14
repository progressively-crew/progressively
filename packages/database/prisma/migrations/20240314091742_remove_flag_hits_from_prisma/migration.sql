/*
  Warnings:

  - You are about to drop the `FlagHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_flagUuid_fkey";

-- DropTable
DROP TABLE "FlagHit";
