/*
  Warnings:

  - Added the required column `visitorId` to the `FlagHit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlagHit" ADD COLUMN     "visitorId" TEXT NOT NULL;
