/*
  Warnings:

  - Added the required column `segmentUuid` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "segmentUuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_segmentUuid_fkey" FOREIGN KEY ("segmentUuid") REFERENCES "Segment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
