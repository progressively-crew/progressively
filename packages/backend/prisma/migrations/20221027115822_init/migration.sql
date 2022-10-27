/*
  Warnings:

  - Added the required column `event` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "event" TEXT NOT NULL;
