/*
  Warnings:

  - A unique constraint covering the columns `[movieId,userId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_movieId_userId_key" ON "WatchlistItem"("movieId", "userId");
