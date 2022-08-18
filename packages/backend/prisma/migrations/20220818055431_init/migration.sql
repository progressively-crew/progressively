/*
  Warnings:

  - You are about to drop the column `rolloutPercentage` on the `RolloutStrategy` table. All the data in the column will be lost.
  - Added the required column `rolloutPercentage` to the `FlagEnvironment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlagEnvironment" ADD COLUMN     "rolloutDate" TIMESTAMP(3),
ADD COLUMN     "rolloutPercentage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RolloutStrategy" DROP COLUMN "rolloutPercentage";
