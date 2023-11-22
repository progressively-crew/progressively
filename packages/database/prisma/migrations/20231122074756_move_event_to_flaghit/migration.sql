/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_pMetricUuid_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "FlagHit" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorId" TEXT NOT NULL,
    "valueResolved" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "FlagHit_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
