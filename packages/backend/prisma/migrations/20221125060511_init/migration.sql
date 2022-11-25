/*
  Warnings:

  - Added the required column `valueToServe` to the `RolloutStrategy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueToServeType` to the `RolloutStrategy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RolloutStrategy" ADD COLUMN     "valueToServe" TEXT NOT NULL,
ADD COLUMN     "valueToServeType" TEXT NOT NULL;
