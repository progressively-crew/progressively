/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_flagEnvironmentFlagId_flagEnvironmentEnvironmentI_fkey";

-- DropTable
DROP TABLE "Schedule";
