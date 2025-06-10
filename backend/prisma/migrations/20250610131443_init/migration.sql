/*
  Warnings:

  - You are about to drop the column `maxPlayer` on the `Game` table. All the data in the column will be lost.
  - Added the required column `maxPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
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
    "boxImageUrl" TEXT NOT NULL
);
INSERT INTO "new_Game" ("averageDuration", "boxImageUrl", "company", "id", "minPlayers", "title") SELECT "averageDuration", "boxImageUrl", "company", "id", "minPlayers", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
