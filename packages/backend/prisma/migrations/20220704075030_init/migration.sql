/*
  Warnings:

  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_experimentUuid_fkey";

-- DropForeignKey
ALTER TABLE "VariationHit" DROP CONSTRAINT "VariationHit_variationUuid_fkey";

-- DropTable
DROP TABLE "Variation";

-- CreateTable
CREATE TABLE "Variant" (
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experimentUuid" TEXT,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_experimentUuid_fkey" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationHit" ADD CONSTRAINT "VariationHit_variationUuid_fkey" FOREIGN KEY ("variationUuid") REFERENCES "Variant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
