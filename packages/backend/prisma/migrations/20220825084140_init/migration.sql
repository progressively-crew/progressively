-- CreateTable
CREATE TABLE "Schedule" (
    "uuid" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "rolloutPercentage" INTEGER NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_flagEnvironmentFlagId_flagEnvironmentEnvironmentI_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
