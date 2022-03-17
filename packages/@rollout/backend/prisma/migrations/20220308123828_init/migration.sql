/*
  Warnings:

  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activationToken" TEXT NOT NULL,
    "resetPasswordToken" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_User" ("activationToken", "email", "fullname", "password", "status", "uuid") SELECT "activationToken", "email", "fullname", "password", "status", "uuid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
