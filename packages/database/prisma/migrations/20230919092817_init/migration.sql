/*
  Warnings:

  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `PMetric` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `PMetric` table. All the data in the column will be lost.
  - You are about to drop the column `variantUuid` on the `PMetric` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PMetric" DROP CONSTRAINT "PMetric_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "PMetric" DROP CONSTRAINT "PMetric_variantUuid_fkey";

-- AlterTable
ALTER TABLE "PMetric" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
DROP COLUMN "variantUuid",
ADD COLUMN     "environmentUuid" TEXT;

-- AddForeignKey
ALTER TABLE "PMetric" ADD CONSTRAINT "PMetric_environmentUuid_fkey" FOREIGN KEY ("environmentUuid") REFERENCES "Environment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
