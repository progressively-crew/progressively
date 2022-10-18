/*
  Warnings:

  - You are about to drop the `Metric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MetricHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "MetricHit" DROP CONSTRAINT "MetricHit_flagEnvironmentFlagId_flagEnvironmentEnvironment_fkey";

-- DropTable
DROP TABLE "Metric";

-- DropTable
DROP TABLE "MetricHit";

-- CreateTable
CREATE TABLE "PMetric" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "PMetric_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PMetricHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "PMetricHit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PMetric" ADD CONSTRAINT "PMetric_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMetricHit" ADD CONSTRAINT "PMetricHit_flagEnvironmentFlagId_flagEnvironmentEnvironmen_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
