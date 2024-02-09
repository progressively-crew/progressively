/*
  Warnings:

  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `environmentUuid` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `FlagHit` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `FlagHit` table. All the data in the column will be lost.
  - You are about to drop the column `environmentUuid` on the `Funnel` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `Strategy` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `Strategy` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentEnvironmentId` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `flagEnvironmentFlagId` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the `Environment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlagEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - The required column `clientKey` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `secretKey` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_flagEnvironmentFlagId_flagEnvironmentEnvironme_fkey";

-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_environmentUuid_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_flagId_fkey";

-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "Funnel" DROP CONSTRAINT "Funnel_environmentUuid_fkey";

-- DropForeignKey
ALTER TABLE "Strategy" DROP CONSTRAINT "Strategy_flagEnvironmentFlagId_flagEnvironmentEnvironmentI_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "Webhook" DROP CONSTRAINT "Webhook_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "flagUuid" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "environmentUuid",
ADD COLUMN     "projectUuid" TEXT;

-- AlterTable
ALTER TABLE "FlagHit" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "flagUuid" TEXT;

-- AlterTable
ALTER TABLE "Funnel" DROP COLUMN "environmentUuid",
ADD COLUMN     "projectUuid" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "clientKey" TEXT NOT NULL,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "secretKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Strategy" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "flagUuid" TEXT;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "flagUuid" TEXT;

-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "flagEnvironmentEnvironmentId",
DROP COLUMN "flagEnvironmentFlagId",
ADD COLUMN     "flagUuid" TEXT;

-- DropTable
DROP TABLE "Environment";

-- DropTable
DROP TABLE "FlagEnvironment";

-- AddForeignKey
ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_flagUuid_fkey" FOREIGN KEY ("flagUuid") REFERENCES "Flag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
