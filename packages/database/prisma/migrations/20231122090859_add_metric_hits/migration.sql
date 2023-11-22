-- CreateTable
CREATE TABLE "MetricHit" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorId" TEXT NOT NULL,
    "data" TEXT,
    "pMetricUuid" TEXT NOT NULL,

    CONSTRAINT "MetricHit_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "MetricHit" ADD CONSTRAINT "MetricHit_pMetricUuid_fkey" FOREIGN KEY ("pMetricUuid") REFERENCES "PMetric"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
