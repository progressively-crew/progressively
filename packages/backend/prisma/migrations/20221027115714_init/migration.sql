-- CreateTable
CREATE TABLE "Webhook" (
    "uuid" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
