-- DropForeignKey
ALTER TABLE "ExperimentEnvironment" DROP CONSTRAINT "ExperimentEnvironment_experimentId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_experimentUuid_fkey";

-- DropForeignKey
ALTER TABLE "VariantHit" DROP CONSTRAINT "VariantHit_variantUuid_fkey";

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_experimentUuid_fkey" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantHit" ADD CONSTRAINT "VariantHit_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentEnvironment" ADD CONSTRAINT "ExperimentEnvironment_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
