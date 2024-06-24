-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "segmentUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_segmentUuid_fkey" FOREIGN KEY ("segmentUuid") REFERENCES "Segment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
