/*
  Warnings:

  - Made the column `fieldName` on table `RolloutStrategy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fieldComparator` on table `RolloutStrategy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fieldValue` on table `RolloutStrategy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RolloutStrategy" ALTER COLUMN "fieldName" SET NOT NULL,
ALTER COLUMN "fieldComparator" SET NOT NULL,
ALTER COLUMN "fieldValue" SET NOT NULL;
