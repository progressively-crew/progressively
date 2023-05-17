/*
  Warnings:

  - The primary key for the `StripeUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `StripeUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StripeUser" DROP CONSTRAINT "StripeUser_pkey",
DROP COLUMN "uuid",
ADD CONSTRAINT "StripeUser_pkey" PRIMARY KEY ("customerId");
