/*
  Warnings:

  - You are about to drop the `FlagHit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PMetricHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "PMetricHit" DROP CONSTRAINT "PMetricHit_flagEnvironmentFlagId_flagEnvironmentEnvironmen_fkey";

-- DropForeignKey
ALTER TABLE "PMetricHit" DROP CONSTRAINT "PMetricHit_pMetricUuid_fkey";

-- DropTable
DROP TABLE "FlagHit";

-- DropTable
DROP TABLE "PMetricHit";

-- CreateTable
CREATE TABLE "Event" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT,
    "pMetricUuid" TEXT,
    "flagEnvironmentFlagId" TEXT NOT NULL,
    "flagEnvironmentEnvironmentId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_pMetricUuid_fkey" FOREIGN KEY ("pMetricUuid") REFERENCES "PMetric"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
