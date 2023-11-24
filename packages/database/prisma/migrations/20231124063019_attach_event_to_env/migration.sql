-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "environmentUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_environmentUuid_fkey" FOREIGN KEY ("environmentUuid") REFERENCES "Environment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
