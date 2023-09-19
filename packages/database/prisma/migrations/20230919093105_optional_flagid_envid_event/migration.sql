-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "flagEnvironmentFlagId" DROP NOT NULL,
ALTER COLUMN "flagEnvironmentEnvironmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
