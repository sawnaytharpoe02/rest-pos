import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession();
    if (session) {
      const { user } = session;
      if (user) {
        const name = user.name as string;
        const email = user.email as string;

        const userFromDb = await prisma.user.findFirst({ where: { email } });
        if (userFromDb) {
          const companyId = userFromDb.companyId;
          const company = await prisma.company.findUnique({
            where: { id: companyId },
          });

          const locations = await prisma.location.findMany({
            where: { companyId: company?.id, isArchived: false },
            orderBy: { id: "asc" },
          });

          const locationIds = locations.map((item) => item.id);
          const tables = await prisma.table.findMany({
            where: { locationId: { in: locationIds }, isArchived: false },
            orderBy: { id: "asc" },
          });

          const menuCategories = await prisma.menuCategory.findMany({
            where: { companyId, isArchived: false },
            orderBy: [{ id: "asc" }],
          });
          const menuCategoryIds = menuCategories.map((item) => item.id);
          const disableLocationMenuCategories =
            await prisma.disableLocationMenuCategory.findMany({
              where: { menuCategoryId: { in: menuCategoryIds } },
            });

          const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
            where: { menuCategoryId: { in: menuCategoryIds } },
          });

          const menuCategoryMenuIds = menuCategoryMenus.map(
            (item) => item.menuId
          );
          const menus = await prisma.menu.findMany({
            where: { id: { in: menuCategoryMenuIds }, isArchived: false },
            orderBy: [{ id: "asc" }],
          });

          const menuIds = menus.map((item) => item.id);
          const disableLocationMenus =
            await prisma.disableLocationMenu.findMany({
              where: { menuId: { in: menuIds } },
            });

          const menuAddonCategories = await prisma.menuAddonCategory.findMany({
            where: { menuId: { in: menuIds } },
          });

          const addonCategories = await prisma.addonCategory.findMany({
            where: {
              id: {
                in: menuAddonCategories.map((item) => item.addonCategoryId),
              },
              isArchived: false,
            },
            orderBy: [{ id: "asc" }],
          });

          const addons = await prisma.addon.findMany({
            where: {
              addonCategoryId: { in: addonCategories.map((item) => item.id) },
              isArchived: false,
            },
            orderBy: [{ id: "asc" }],
          });

          const orders = await prisma.order.findMany({
            where: {
              tableId: { in: tables.map((item) => item.id) },
              isArchived: false,
            },
          });

          return NextResponse.json(
            {
              company,
              locations,
              tables,
              menuCategories,
              menuCategoryMenus,
              menus,
              addonCategories,
              menuAddonCategories,
              addons,
              disableLocationMenuCategories,
              disableLocationMenus,
              orders,
            },
            { status: 200 }
          );
        } else {
          const newCompany = await prisma.company.create({
            data: {
              name: "Default Company",
              street: "Default Street",
              township: "Default Township",
              city: "Default City",
            },
          });

          const newUser = await prisma.user.create({
            data: {
              name: name,
              email: email,
              companyId: newCompany.id,
            },
          });

          const newLocation = await prisma.location.create({
            data: {
              name: "Default Location",
              street: "Deafult Street",
              township: "Default Township",
              city: "Default City",
              companyId: newCompany.id,
            },
          });

          const newTable = await prisma.table.create({
            data: {
              name: "Default Table",
              assetUrl: "",
              locationId: newLocation.id,
            },
          });

          const newMenuCategory = await prisma.menuCategory.create({
            data: {
              name: "Default Category",
              companyId: newCompany.id,
            },
          });

          const newMenu = await prisma.menu.create({
            data: {
              name: "Default Menu",
              description: "Default Description",
              assetUrl: "",
            },
          });

          const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
            data: {
              menuId: newMenu.id,
              menuCategoryId: newMenuCategory.id,
            },
          });

          const newAddonCategory = await prisma.addonCategory.create({
            data: {
              name: "Default Addon Category",
            },
          });

          const newMenuAddonCategory = await prisma.menuAddonCategory.create({
            data: {
              addonCategoryId: newAddonCategory.id,
              menuId: newMenu.id,
            },
          });

          const newAddonsData = [
            { name: "Addon 1", addonCategoryId: newAddonCategory.id },
            { name: "Addon 2", addonCategoryId: newAddonCategory.id },
            { name: "Addon 3", addonCategoryId: newAddonCategory.id },
          ];

          const newAddons = await prisma.$transaction(
            newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
          );

          return NextResponse.json(
            {
              company: newCompany,
              locations: [newLocation],
              tables: [newTable],
              menuCategories: [newMenuCategory],
              menus: [newMenu],
              addonCategories: [newAddonCategory],
              addons: [newAddons],
              menuCategoryMenus: [newMenuCategoryMenu],
              menuAddonCategories: [newMenuAddonCategory],
            },
            { status: 201 }
          );
        }
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
