-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activationToken" TEXT,
    "resetPasswordToken" TEXT,
    "status" TEXT NOT NULL
);
INSERT INTO "new_User" ("activationToken", "email", "fullname", "password", "resetPasswordToken", "status", "uuid") SELECT "activationToken", "email", "fullname", "password", "resetPasswordToken", "status", "uuid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
