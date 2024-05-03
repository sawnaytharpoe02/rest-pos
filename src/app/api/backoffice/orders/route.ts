import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";

export async function PUT(req: NextRequest) {
  try {
    const itemId = req.nextUrl.searchParams.get("itemId");
    const { status } = await req.json();
    const isValid = itemId && status;
    if (!isValid)
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });

    const exist = await prisma.order.findFirst({ where: { itemId } });
    if (!exist)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    await prisma.order.updateMany({
      where: { itemId },
      data: { status: status as ORDERSTATUS },
    });
    const table = await prisma.table.findFirst({
      where: { id: exist.tableId },
    });
    const tableIds = (
      await prisma.table.findMany({ where: { locationId: table?.locationId } })
    ).map((item) => item.id);
    const orders = await prisma.order.findMany({
      where: { tableId: { in: tableIds }, isArchived: false },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
