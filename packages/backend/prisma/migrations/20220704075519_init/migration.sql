/*
  Warnings:

  - You are about to drop the `VariationHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VariationHit" DROP CONSTRAINT "VariationHit_variationUuid_fkey";

-- DropTable
DROP TABLE "VariationHit";

-- CreateTable
CREATE TABLE "VariantHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "variantUuid" TEXT NOT NULL,

    CONSTRAINT "VariantHit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantHit" ADD CONSTRAINT "VariantHit_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
