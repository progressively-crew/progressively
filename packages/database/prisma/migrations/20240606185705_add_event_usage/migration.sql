-- CreateTable
CREATE TABLE "EventUsage" (
    "projectUuid" TEXT NOT NULL,
    "eventsCount" INTEGER NOT NULL,

    CONSTRAINT "EventUsage_pkey" PRIMARY KEY ("projectUuid")
);

-- AddForeignKey
ALTER TABLE "EventUsage" ADD CONSTRAINT "EventUsage_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
