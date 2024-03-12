/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_projectUuid_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sessionUuid_fkey";

-- DropTable
DROP TABLE "Event";
