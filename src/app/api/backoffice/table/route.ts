import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { qrCodeImageUpload } from "@/utils/assetUpload";

export async function POST(req: Request, res: Response) {
  try {
    const { name, assetUrl, locationId } = await req.json();

    const isValid = name && locationId;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    let table = await prisma.table.create({
      data: {
        name,
        assetUrl,
        locationId,
      },
    });

    const qrCodeImg = await qrCodeImageUpload(table.id);
    table = await prisma.table.update({
      where: { id: table.id },
      data: { assetUrl: qrCodeImg },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, ...payload } = await req.json();

    const existingTable = await prisma.table.findUnique({ where: { id } });
    if (!existingTable) {
      return NextResponse.json({ message: "Table not found" }, { status: 404 });
    }

    const table = await prisma.table.update({
      where: { id },
      data: { ...payload },
    });

    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));

    const existingTable = await prisma.table.findUnique({
      where: { id },
    });
    if (!existingTable) {
      return NextResponse.json({ message: "Table not found" }, { status: 404 });
    }

    const table = await prisma.table.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
