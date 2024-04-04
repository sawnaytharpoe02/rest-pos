import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const menuCategories = await prisma.menuCategory.findMany();
    return NextResponse.json(
      { message: "OK GET REQ", data: { menuCategories } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { name, companyId } = await req.json();
    const isValid = name && companyId
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });
    return NextResponse.json(menuCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, isAvailable, locationId, ...payload } = await req.json();

    const menuCategory = await prisma.menuCategory.findFirst({ where: { id } });
    if (!menuCategory) {
      return NextResponse.json(
        { message: "Menu category not found" },
        { status: 404 }
      );
    }
    const updatedMenuCategory = await prisma.menuCategory.update({
      where: { id },
      data: payload,
    });

    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenuCategory.create({
          data: {
            locationId,
            menuCategoryId: id,
          },
        });
      } else {
        const item = await prisma.disableLocationMenuCategory.findFirst({
          where: { menuCategoryId: id, locationId },
        });

        item &&
          (await prisma.disableLocationMenuCategory.delete({
            where: { id: item.id },
          }));
      }
    }

    const disableLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany({
        where: { menuCategoryId: id },
      });
    return NextResponse.json(
      { updatedMenuCategory, disableLocationMenuCategories },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    const existingMenuCategory = await prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!existingMenuCategory) {
      return NextResponse.json(
        { message: "Menu category not found" },
        { status: 404 }
      );
    }

    const menuCategory = await prisma.menuCategory.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(menuCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
