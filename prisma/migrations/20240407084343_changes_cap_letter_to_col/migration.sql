/*
  Warnings:

  - You are about to drop the `disableLocationMenuCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "disableLocationMenuCategory" DROP CONSTRAINT "disableLocationMenuCategory_locationId_fkey";

-- DropForeignKey
ALTER TABLE "disableLocationMenuCategory" DROP CONSTRAINT "disableLocationMenuCategory_menuCategoryId_fkey";

-- DropTable
DROP TABLE "disableLocationMenuCategory";

-- CreateTable
CREATE TABLE "DisableLocationMenuCategory" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,

    CONSTRAINT "DisableLocationMenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisableLocationMenu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DisableLocationMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategory" ADD CONSTRAINT "DisableLocationMenuCategory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategory" ADD CONSTRAINT "DisableLocationMenuCategory_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenu" ADD CONSTRAINT "DisableLocationMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenu" ADD CONSTRAINT "DisableLocationMenu_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
