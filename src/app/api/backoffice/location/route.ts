import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { name, street, township, city, companyId } = await res.json();

    const isValid = name && street && township && city && companyId;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const location = await prisma.location.create({
      data: {
        name,
        street,
        township,
        city,
        companyId,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, name, street, township, city, companyId } = await req.json();

    const isValid = name && street && township && city && companyId;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const location = await prisma.location.update({
      where: { id },
      data: {
        name,
        street,
        township,
        city,
        companyId,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
