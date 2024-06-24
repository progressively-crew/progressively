-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Segment" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SegmentRule" (
    "uuid" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "segmentUuid" TEXT,

    CONSTRAINT "SegmentRule_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentRule" ADD CONSTRAINT "SegmentRule_segmentUuid_fkey" FOREIGN KEY ("segmentUuid") REFERENCES "Segment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
