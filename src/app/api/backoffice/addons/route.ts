import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { name, price, addonCategoryId } = await req.json();

    const isValid = name && price !== undefined && addonCategoryId;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const addon = await prisma.addon.create({
      data: {
        name,
        price,
        addonCategoryId,
      },
    });

    return NextResponse.json(addon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, ...payload } = await req.json();

    const existingAddon = await prisma.addon.findFirst({ where: { id } });
    if (!existingAddon) {
      return NextResponse.json({ message: "Addon not found" }, { status: 404 });
    }
    const addon = await prisma.addon.update({
      where: { id },
      data: {
        ...payload,
      },
    });

    return NextResponse.json(addon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));

    const existingAddon = await prisma.addon.findUnique({
      where: { id },
    });
    if (!existingAddon) {
      return NextResponse.json({ message: "Addon not found" }, { status: 404 });
    }

    const addon = await prisma.addon.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(addon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
