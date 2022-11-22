/*
  Warnings:

  - Added the required column `visitorId` to the `PMetricHit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PMetricHit" ADD COLUMN     "visitorId" TEXT NOT NULL;
