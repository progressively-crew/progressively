-- CreateTable
CREATE TABLE "StripeOrder" (
    "uuid" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "projectUuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeOrder_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "StripeOrder" ADD CONSTRAINT "StripeOrder_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeOrder" ADD CONSTRAINT "StripeOrder_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
