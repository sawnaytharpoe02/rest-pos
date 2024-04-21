import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const tableId = Number(req.nextUrl.searchParams.get("tableId"));

  const table = await prisma.table.findFirst({
    where: { id: tableId },
  });

  if (!table)
    return NextResponse.json({ message: "Table not found" }, { status: 404 });

  const location = await prisma.location.findUnique({
    where: { id: table.locationId },
  });

  const company = await prisma.company.findUnique({
    where: { id: location?.companyId },
  });

  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId: company?.id, isArchived: false },
  });

  const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
    where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
  });

  const menus = await prisma.menu.findMany({
    where: { id: { in: menuCategoryMenus.map((item) => item.menuId) } },
  });

  // searched relationals data
  const menuAddonCategories = await prisma.menuAddonCategory.findMany({
    where: { menuId: { in: menus.map((item) => item.id) } },
  });

  const addonCategories = await prisma.addonCategory.findMany({
    where: {
      id: { in: menuAddonCategories.map((item) => item.addonCategoryId) },
    },
  });

  const addons = await prisma.addon.findMany({
    where: { addonCategoryId: { in: addonCategories.map((item) => item.id) } },
  });

  const disableLocationMenuCategories =
    await prisma.disableLocationMenuCategory.findMany({
      where: {
        locationId: location?.id,
        menuCategoryId: { in: menuCategories.map((item) => item.id) },
      },
    });

  const disableLocationMenus = await prisma.disableLocationMenu.findMany({
    where: {
      locationId: location?.id,
      menuId: { in: menus.map((item) => item.id) },
    },
  });

  return NextResponse.json(
    {
      company,
      locations: [location],
      tables: [table],
      menuCategories,
      menuCategoryMenus,
      menus,
      addonCategories: [],
      menuAddonCategories: [],
      addons: [],
      disableLocationMenuCategories: [],
      disableLocationMenus: [],
    },
    { status: 200 }
  );
}
