-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "FlagEnvironment" DROP CONSTRAINT "FlagEnvironment_flagId_fkey";

-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetTokens" DROP CONSTRAINT "PasswordResetTokens_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "RolloutStrategy" DROP CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvir_fkey";

-- DropForeignKey
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "Flag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolloutStrategy" ADD CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvir_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE CASCADE ON UPDATE CASCADE;
