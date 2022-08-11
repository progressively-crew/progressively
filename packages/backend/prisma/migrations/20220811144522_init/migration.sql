/*
  Warnings:

  - Made the column `rolloutPercentage` on table `RolloutStrategy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RolloutStrategy" ALTER COLUMN "rolloutPercentage" SET NOT NULL;
