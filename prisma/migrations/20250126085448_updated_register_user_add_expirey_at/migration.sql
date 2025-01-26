/*
  Warnings:

  - Added the required column `expireyAt` to the `RegistUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegistUser" ADD COLUMN     "expireyAt" TIMESTAMP(3) NOT NULL;
