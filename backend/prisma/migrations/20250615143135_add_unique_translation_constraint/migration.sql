/*
  Warnings:

  - A unique constraint covering the columns `[gameId,lang]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_gameId_lang_key" ON "Translation"("gameId", "lang");
