/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `utc` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "timestamp",
ADD COLUMN     "utc" TIMESTAMP(3) NOT NULL;
