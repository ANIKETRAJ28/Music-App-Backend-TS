/*
  Warnings:

  - You are about to drop the column `defaultPlaylistId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_defaultPlaylistId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultPlaylistId";
