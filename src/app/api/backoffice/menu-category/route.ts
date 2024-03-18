import { NextResponse } from "next/server";
import {prisma} from '@/utils/prisma'

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

export async function POST(req: Request, res: Response){
  try {
    const {name, isAvailable} = await req.json();
    const isValid = name !== null;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menuCategory = await prisma.menuCategory.create({data: {name, isAvailable}})
    return NextResponse.json({message: 'OK POST REQ', menuCategory}, {status: 201})
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}