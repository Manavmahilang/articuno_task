/*
  Warnings:

  - Added the required column `brief` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "brief" TEXT NOT NULL,
ADD COLUMN     "image" TEXT;
