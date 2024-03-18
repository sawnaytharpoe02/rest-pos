/*
  Warnings:

  - You are about to drop the column `isAvaliable` on the `MenuCategory` table. All the data in the column will be lost.
  - Added the required column `isAvailable` to the `MenuCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "isAvaliable",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;
