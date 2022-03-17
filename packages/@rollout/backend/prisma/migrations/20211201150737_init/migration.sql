-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FlagEnvironment" (
    "flagId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_ACTIVATED',

    PRIMARY KEY ("flagId", "environmentId"),
    CONSTRAINT "FlagEnvironment_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "Flag" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlagEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FlagEnvironment" ("environmentId", "flagId", "status") SELECT "environmentId", "flagId", "status" FROM "FlagEnvironment";
DROP TABLE "FlagEnvironment";
ALTER TABLE "new_FlagEnvironment" RENAME TO "FlagEnvironment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
