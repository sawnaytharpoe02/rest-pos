import { NextResponse } from "next/server";
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
    const { name, isAvailable, companyId } = await req.json();
    const isValid = name && companyId && isAvailable !== null;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    return NextResponse.json(menuCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, ...payload } = await req.json();

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
    return NextResponse.json(updatedMenuCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
