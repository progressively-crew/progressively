/*
  Warnings:

  - You are about to drop the column `environmentCount` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `projectCount` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "environmentCount",
DROP COLUMN "projectCount";
