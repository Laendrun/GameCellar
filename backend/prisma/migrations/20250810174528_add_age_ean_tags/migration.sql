-- AlterTable
ALTER TABLE "Game" ADD COLUMN "ageRecommendation" TEXT;

-- AlterTable
ALTER TABLE "Translation" ADD COLUMN "eanCode" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameTag" (
    "gameId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("gameId", "tagId"),
    CONSTRAINT "GameTag_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
