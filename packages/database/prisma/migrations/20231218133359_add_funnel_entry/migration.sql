/*
  Warnings:

  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `Funnel` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `Funnel` table. All the data in the column will be lost.
  - Added the required column `environmentUuid` to the `Funnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Funnel" DROP CONSTRAINT "Funnel_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- AlterTable
ALTER TABLE "Funnel" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "environmentUuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FunnelEntry" (
    "uuid" TEXT NOT NULL,
    "flagUuid" TEXT,
    "flagVariant" TEXT,
    "eventName" TEXT,
    "funnelUuid" TEXT NOT NULL,

    CONSTRAINT "FunnelEntry_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_environmentUuid_fkey" FOREIGN KEY ("environmentUuid") REFERENCES "Environment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunnelEntry" ADD CONSTRAINT "FunnelEntry_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunnelEntry" ADD CONSTRAINT "FunnelEntry_funnelUuid_fkey" FOREIGN KEY ("funnelUuid") REFERENCES "Funnel"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
