/*
  Warnings:

  - Added the required column `variantType` to the `FlagEnvironment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlagEnvironment" ADD COLUMN     "variantType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Variant" (
    "uuid" TEXT NOT NULL,
    "rolloutPercentage" INTEGER NOT NULL DEFAULT 100,
    "isControl" BOOLEAN NOT NULL,
    "value" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
