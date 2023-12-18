-- CreateTable
CREATE TABLE "Funnel" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "flagEnvironmentFlagId" TEXT NOT NULL,
    "flagEnvironmentEnvironmentId" TEXT NOT NULL,

    CONSTRAINT "Funnel_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
