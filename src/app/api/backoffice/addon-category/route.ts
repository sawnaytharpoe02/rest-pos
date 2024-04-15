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

    const menuAddonCategory = await prisma.$transaction(
      menuIds.map((menuId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId, addonCategoryId: addonCategory.id },
        })
      )
    );
    return NextResponse.json(
      { addonCategory, menuAddonCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
