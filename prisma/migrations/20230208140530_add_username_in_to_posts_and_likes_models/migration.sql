/*
  Warnings:

  - Added the required column `username` to the `Likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "username" TEXT NOT NULL;
