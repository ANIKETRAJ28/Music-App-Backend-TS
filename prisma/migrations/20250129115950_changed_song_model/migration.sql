/*
  Warnings:

  - Added the required column `description` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
