-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_defaultPlaylistId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "defaultPlaylistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultPlaylistId_fkey" FOREIGN KEY ("defaultPlaylistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
