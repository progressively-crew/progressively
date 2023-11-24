/*
  Warnings:

  - Added the required column `browser` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "browser" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL;
