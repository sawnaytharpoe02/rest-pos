import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  try {
    const { id, ...payload } = await req.json();

    const company = await prisma.company.update({
      where: { id },
      data: { ...payload },
    });

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
