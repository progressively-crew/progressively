/*
  Warnings:

  - You are about to drop the `MetricHit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PMetric` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MetricHit" DROP CONSTRAINT "MetricHit_pMetricUuid_fkey";

-- DropForeignKey
ALTER TABLE "PMetric" DROP CONSTRAINT "PMetric_environmentUuid_fkey";

-- DropTable
DROP TABLE "MetricHit";

-- DropTable
DROP TABLE "PMetric";

-- CreateTable
CREATE TABLE "Event" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorId" TEXT NOT NULL,
    "data" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uuid")
);
