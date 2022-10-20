-- AlterTable
ALTER TABLE "FlagHit" ADD COLUMN     "variantUuid" TEXT;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
