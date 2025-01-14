-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultPlaylistId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultPlaylistId_fkey" FOREIGN KEY ("defaultPlaylistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
