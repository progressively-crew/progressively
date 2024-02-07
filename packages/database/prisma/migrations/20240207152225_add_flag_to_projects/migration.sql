-- AlterTable
ALTER TABLE "Flag" ADD COLUMN     "projectUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
