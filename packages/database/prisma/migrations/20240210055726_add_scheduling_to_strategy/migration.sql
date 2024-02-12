-- AlterTable
ALTER TABLE "Strategy" ADD COLUMN     "whenPredicate" TEXT NOT NULL DEFAULT 'ALWAYS',
ADD COLUMN     "whenTimestamp" TIMESTAMP(3);
