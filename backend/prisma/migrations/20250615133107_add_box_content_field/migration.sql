-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "minPlayers" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "averageDuration" INTEGER NOT NULL,
    "boxImageUrl" TEXT NOT NULL,
    "boxContent" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Game" ("averageDuration", "boxImageUrl", "company", "id", "maxPlayers", "minPlayers", "title") SELECT "averageDuration", "boxImageUrl", "company", "id", "maxPlayers", "minPlayers", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
