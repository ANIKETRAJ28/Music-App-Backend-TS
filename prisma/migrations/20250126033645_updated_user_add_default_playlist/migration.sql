/*
  Warnings:

  - Added the required column `defaultPlaylistId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultPlaylistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultPlaylistId_fkey" FOREIGN KEY ("defaultPlaylistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
