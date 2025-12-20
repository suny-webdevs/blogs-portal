/*
  Warnings:

  - You are about to drop the column `description` on the `news` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "description",
ADD COLUMN     "content" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");
