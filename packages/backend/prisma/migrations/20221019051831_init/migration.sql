-- AlterTable
ALTER TABLE "PMetric" ADD COLUMN     "variantUuid" TEXT;

-- AddForeignKey
ALTER TABLE "PMetric" ADD CONSTRAINT "PMetric_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
