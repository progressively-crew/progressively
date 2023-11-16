/*
  Warnings:

  - You are about to drop the column `trialEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "StripeUser" DROP CONSTRAINT "StripeUser_userUuid_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "trialEnd";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "StripeTransaction";

-- DropTable
DROP TABLE "StripeUser";
