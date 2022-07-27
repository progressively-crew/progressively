/*
  Warnings:

  - You are about to drop the `Experiment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExperimentEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExperimentEnvironment" DROP CONSTRAINT "ExperimentEnvironment_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "ExperimentEnvironment" DROP CONSTRAINT "ExperimentEnvironment_experimentId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_experimentUuid_fkey";

-- DropForeignKey
ALTER TABLE "VariantHit" DROP CONSTRAINT "VariantHit_variantUuid_fkey";

-- DropTable
DROP TABLE "Experiment";

-- DropTable
DROP TABLE "ExperimentEnvironment";

-- DropTable
DROP TABLE "Variant";

-- DropTable
DROP TABLE "VariantHit";
