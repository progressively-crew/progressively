-- CreateTable
CREATE TABLE "PasswordResetTokens" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "dateEnd" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    CONSTRAINT "PasswordResetTokens_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
