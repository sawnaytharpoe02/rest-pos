import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { name, street, township, city } = await req.json();

    const isValid = name && street && township && city;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const company = await prisma.company.create({
      data: {
        name,
        street,
        township,
        city,
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, ...payload } = await req.json();

    const company = await prisma.company.update({
      where: { id },
      data: {...payload},
    });

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));

    const existingCompany = await prisma.company.findUnique({
      where: { id },
    });
    if (!existingCompany) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    const company = await prisma.company.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
