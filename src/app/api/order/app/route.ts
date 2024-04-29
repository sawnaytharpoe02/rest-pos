import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const tableId = req.nextUrl.searchParams.get("tableId");

  const table = await prisma.table.findFirst({
    where: { id: Number(tableId) },
  });

  if (!table)
    return NextResponse.json({ message: "Table not found" }, { status: 404 });

  const location = await prisma.location.findUnique({
    where: { id: table.locationId },
  });

  const company = await prisma.company.findUnique({
    where: { id: location?.companyId },
  });

  let menuCategories = await prisma.menuCategory.findMany({
    where: { companyId: company?.id, isArchived: false },
  });

  const disabledMenuCategoryIds = (
    await prisma.disableLocationMenuCategory.findMany({
      where: {
        locationId: location?.id,
        menuCategoryId: { in: menuCategories.map((item) => item.id) },
      },
    })
  ).map((item) => item.menuCategoryId);

  menuCategories = menuCategories.filter((item) =>
    !disabledMenuCategoryIds.includes(item.id)
  );

  const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
    where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
  });

  const menuIds = menuCategoryMenus.map((item) => item.menuId);
  const disableMenuIds = (
    await prisma.disableLocationMenu.findMany({
      where: {
        locationId: location?.id,
        menuId: { in: menuIds },
      },
    })
  ).map((item) => item.menuId);

  const menus = (
    await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
        isArchived: false,
      },
    })
  ).filter((item) => !disableMenuIds.includes(item.id));

  // searched relationals data
  const menuAddonCategories = await prisma.menuAddonCategory.findMany({
    where: { menuId: { in: menuIds } },
  });

  const addonCategories = await prisma.addonCategory.findMany({
    where: {
      id: { in: menuAddonCategories.map((item) => item.addonCategoryId) },
      isArchived: false,
    },
  });

  const addons = await prisma.addon.findMany({
    where: {
      addonCategoryId: { in: addonCategories.map((item) => item.id) },
      isArchived: false,
    },
  });

  const orders = await prisma.order.findMany({
    where: { tableId: Number(tableId) },
  });

  return NextResponse.json(
    {
      company,
      locations: [location],
      tables: [table],
      menuCategories,
      menuCategoryMenus,
      menus,
      addonCategories,
      menuAddonCategories,
      addons,
      disableLocationMenuCategories: [],
      disableLocationMenus: [],
      orders,
    },
    { status: 200 }
  );
}
