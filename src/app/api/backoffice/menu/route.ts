import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request, res: Response) {
  console.log("GET REQ");

  return NextResponse.json({ message: "OK GET REQ" }, { status: 200 });
}

export async function POST(req: Request, res: Response) {
  try {
    const { name, price } = await req.json();
    const isValid = name && price !== null;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menu = await prisma.menu.create({ data: { name, price } });
    return NextResponse.json(
      { message: "OK POST REQ", menu },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
