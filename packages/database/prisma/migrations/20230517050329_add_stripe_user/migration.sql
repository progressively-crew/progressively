-- CreateTable
CREATE TABLE "StripeUser" (
    "uuid" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "StripeUser_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "StripeUser" ADD CONSTRAINT "StripeUser_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
