/*
  Warnings:

  - Added the required column `titleBorderArea` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleBorderColor` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "titleBorder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "titleBorderArea" TEXT NOT NULL,
ADD COLUMN     "titleBorderColor" TEXT NOT NULL;
