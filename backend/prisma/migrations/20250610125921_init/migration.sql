-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "minPlayers" INTEGER NOT NULL,
    "maxPlayer" INTEGER NOT NULL,
    "averageDuration" INTEGER NOT NULL,
    "boxImageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Link_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lang" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Translation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
