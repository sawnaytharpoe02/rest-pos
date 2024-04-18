import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "OK GET REQ" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, description, menuCategoryIds, assetUrl } =
      await req.json();
    const isValid =
      name && description && price !== null && menuCategoryIds.length > 0;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menu = await prisma.menu.create({
      data: { name, price, description, assetUrl },
    });

    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: {
            menuId: menu.id,
            menuCategoryId: itemId,
          },
        })
      )
    );

    return NextResponse.json({ menu, menuCategoryMenus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, menuCategoryIds, locationId, isAvailable, ...payload } =
      await req.json();

    const existingMenu = await prisma.menu.findFirst({ where: { id } });
    if (!existingMenu)
      return NextResponse.json({ message: "Menu Not Found." }, { status: 404 });

    const menu = await prisma.menu.update({
      where: { id },
      data: payload,
    });

    // Find existing menu categories for the menu from database
    const findMenuCategories = await prisma.menuCategoryMenu.findMany({
      where: { menuId: id },
    });

    // Identify menuCategoryIds to delete
    const menuCategoryIdsToDelete = findMenuCategories
      .filter((item) => !menuCategoryIds.includes(item.menuCategoryId))
      .map((item) => item.menuCategoryId);

    // Identify menuCategoryIds to create
    const menuCategoryIdsToCreate = menuCategoryIds.filter(
      (item: number) =>
        !findMenuCategories.find(
          (menuCategory) => menuCategory.menuCategoryId === item
        )
    );

    if (menuCategoryIdsToDelete.length) {
      await prisma.menuCategoryMenu.deleteMany({
        where: {
          menuCategoryId: { in: menuCategoryIdsToDelete },
          menuId: menu.id,
        },
      });
    }

    if (menuCategoryIdsToCreate.length) {
      await prisma.$transaction(
        menuCategoryIdsToCreate.map((itemId: number) =>
          prisma.menuCategoryMenu.create({
            data: {
              menuId: menu.id,
              menuCategoryId: itemId,
            },
          })
        )
      );
    }

    if (isAvailable !== undefined && locationId) {
      if (isAvailable === false) {
        const item = await prisma.disableLocationMenu.findFirst({
          where: { locationId, menuId: id },
        });
        !item &&
          (await prisma.disableLocationMenu.create({
            data: {
              locationId,
              menuId: id,
            },
          }));
      } else {
        const item = await prisma.disableLocationMenu.findFirst({
          where: { locationId, menuId: id },
        });
        item &&
          (await prisma.disableLocationMenu.delete({
            where: { id: item.id },
          }));
      }
    }

    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const locations = await prisma.location.findMany({
      where: { companyId: location?.companyId },
    });

    const disableLocationMenus = await prisma.disableLocationMenu.findMany({
      where: {
        locationId: { in: locations.map((location) => location.id) },
      },
    });

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany();

    return NextResponse.json(
      { menu, menuCategoryMenus, disableLocationMenus },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update menu" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    const existingMenu = await prisma.menu.findFirst({ where: { id } });
    if (!existingMenu) {
      return NextResponse.json("Menu not found", { status: 404 });
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to delete menu", { status: 500 });
  }
}
