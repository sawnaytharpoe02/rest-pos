import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, isRequired, menuIds } = await req.json();
    const isValid = name && isRequired !== undefined && menuIds.length > 0;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });

    await prisma.$transaction(
      menuIds.map((menuId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId, addonCategoryId: addonCategory.id },
        })
      )
    );

    const menuAddonCategory = await prisma.menuAddonCategory.findMany();
    return NextResponse.json(
      { addonCategory, menuAddonCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, menuIds, ...payload } = await req.json();

    const addonCategory = await prisma.addonCategory.findFirst({
      where: { id },
    });
    if (!addonCategory) {
      return NextResponse.json(
        { message: "Addon category not found" },
        { status: 404 }
      );
    }
    const updateAddonCategory = await prisma.addonCategory.update({
      where: { id },
      data: payload,
    });

    if (menuIds.length > 0) {
      const existingMenuAddonCategory = await prisma.menuAddonCategory.findMany(
        {
          where: { id },
        }
      );

      const toRemove = existingMenuAddonCategory.filter(
        (item) => !menuIds.includes(item.menuId)
      );
      const toAdd = menuIds.filter(
        (menuId: number) =>
          !existingMenuAddonCategory.find((item) => item.menuId === menuId)
      );

      if (toRemove.length) {
        await prisma.menuAddonCategory.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
      }

      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((menuId: number) =>
            prisma.menuAddonCategory.create({
              data: { menuId, addonCategoryId: id },
            })
          )
        );
      }
    }
    const updateMenuAddonCategory = await prisma.menuAddonCategory.findMany();

    return NextResponse.json(
      { updateAddonCategory, updateMenuAddonCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    const existingAddonCategory = await prisma.addonCategory.findFirst({
      where: { id },
    });
    if (!existingAddonCategory) {
      return NextResponse.json(
        { message: "Addon category not found" },
        { status: 404 }
      );
    }

    const addonCategory = await prisma.addonCategory.update({
      where: { id: existingAddonCategory.id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(addonCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
