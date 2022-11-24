/*
  Warnings:

  - You are about to drop the column `name` on the `Eligibility` table. All the data in the column will be lost.
  - Made the column `fieldName` on table `Eligibility` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fieldComparator` on table `Eligibility` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fieldValue` on table `Eligibility` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Eligibility" DROP COLUMN "name",
ALTER COLUMN "fieldName" SET NOT NULL,
ALTER COLUMN "fieldComparator" SET NOT NULL,
ALTER COLUMN "fieldValue" SET NOT NULL;
