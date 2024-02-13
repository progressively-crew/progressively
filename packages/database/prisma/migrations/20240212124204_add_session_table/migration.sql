-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "sessionUuid" TEXT;

-- CreateTable
CREATE TABLE "Session" (
    "uuid" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sessionUuid_fkey" FOREIGN KEY ("sessionUuid") REFERENCES "Session"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
