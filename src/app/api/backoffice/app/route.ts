import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request, res: Response) {
try {
    const menus = await prisma.menu.findMany();
    const menuCategories = await prisma.menuCategory.findMany();
    return NextResponse.json(
      { message: "OK GET REQ", menus, menuCategories },
      { status: 200 }
    );
} catch (error) {
  return NextResponse.json({ message: error }, { status: 500 });
}
}
