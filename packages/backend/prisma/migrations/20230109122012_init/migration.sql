/*
  Warnings:

  - You are about to drop the column `rolloutPercentage` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `data` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "rolloutPercentage",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
