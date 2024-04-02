import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ message: "OK GET REQ" }, { status: 200 });
}

export async function POST(req: Request, res: Response) {
  try {
    const { name, price, description, menuCategoryIds } = await req.json();
    const isValid =
      name && description && price !== null && menuCategoryIds.length > 0;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menu = await prisma.menu.create({
      data: { name, price, description },
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

export async function PUT(req: Request, res: Response) {
  try {
    const { id, name, description, price, menuCategoryIds } = await req.json();

    const isValid =
      name && description && price !== null && menuCategoryIds.length > 0;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const existingMenu = await prisma.menu.findFirst({ where: { id } });
    if (!existingMenu)
      return NextResponse.json({ message: "Menu Not Found." }, { status: 404 });

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        price,
        description,
      },
    });

    // Find existing menu categories for the menu
    const findMenuCategories = await prisma.menuCategoryMenu.findMany({
      where: { menuId: menu.id },
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

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuId: menu.id },
    });

    return NextResponse.json({ menu, menuCategoryMenus }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update menu" },
      { status: 500 }
    );
  }
}
