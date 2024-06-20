-- AlterTable
ALTER TABLE "Segment" ADD COLUMN     "projectUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
