-- CreateTable
CREATE TABLE "StripeTransaction" (
    "uuid" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "stripedCreatedAt" INTEGER NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "StripeTransaction_pkey" PRIMARY KEY ("uuid")
);
