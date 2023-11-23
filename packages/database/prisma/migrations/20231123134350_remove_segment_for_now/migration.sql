/*
  Warnings:

  - You are about to drop the column `segmentUuid` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the `Segment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_segmentUuid_fkey";

-- DropForeignKey
ALTER TABLE "Segment" DROP CONSTRAINT "Segment_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "segmentUuid";

-- DropTable
DROP TABLE "Segment";
