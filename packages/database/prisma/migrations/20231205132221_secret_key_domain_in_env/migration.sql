/*
  Warnings:

  - The required column `secretKey` was added to the `Environment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Environment" ADD COLUMN     "domain" TEXT,
ADD COLUMN     "secretKey" TEXT NOT NULL;
