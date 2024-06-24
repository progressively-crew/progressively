-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_segmentUuid_fkey";

-- AlterTable
ALTER TABLE "Rule" ALTER COLUMN "segmentUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_segmentUuid_fkey" FOREIGN KEY ("segmentUuid") REFERENCES "Segment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
