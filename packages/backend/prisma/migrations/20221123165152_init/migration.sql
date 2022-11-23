/*
  Warnings:

  - You are about to drop the `Elligibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlagEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlagHit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PMetricHit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolloutStrategy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Webhook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Elligibility" DROP CONSTRAINT "Elligibility_flagEnvironmentFlagId_flagEnvironmentEnvironm_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_flagId_fkey";

-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_variantUuid_fkey";

-- DropForeignKey
ALTER TABLE "PMetric" DROP CONSTRAINT "PMetric_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "PMetric" DROP CONSTRAINT "PMetric_variantUuid_fkey";

-- DropForeignKey
ALTER TABLE "PMetricHit" DROP CONSTRAINT "PMetricHit_flagEnvironmentFlagId_flagEnvironmentEnvironmen_fkey";

-- DropForeignKey
ALTER TABLE "PMetricHit" DROP CONSTRAINT "PMetricHit_pMetricUuid_fkey";

-- DropForeignKey
ALTER TABLE "RolloutStrategy" DROP CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvir_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_flagEnvironmentFlagId_flagEnvironmentEnvironmentI_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "Webhook" DROP CONSTRAINT "Webhook_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropTable
DROP TABLE "Elligibility";

-- DropTable
DROP TABLE "Flag";

-- DropTable
DROP TABLE "FlagEnvironment";

-- DropTable
DROP TABLE "FlagHit";

-- DropTable
DROP TABLE "PMetric";

-- DropTable
DROP TABLE "PMetricHit";

-- DropTable
DROP TABLE "RolloutStrategy";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "Variant";

-- DropTable
DROP TABLE "Webhook";
