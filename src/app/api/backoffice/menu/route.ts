import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ message: "OK GET REQ" }, { status: 200 });
}

export async function POST(req: Request, res: Response) {
  try {
    const { name, price, description, menuCategoryIds } = await req.json();
    const isValid =
      name && description && price !== null && menuCategoryIds.length > 0;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menu = await prisma.menu.create({
      data: { name, price, description },
    });

    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: {
            menuId: menu.id,
            menuCategoryId: itemId,
          },
        })
      )
    );

    return NextResponse.json({ menu, menuCategoryMenus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, name, description, price, menuCategoryIds } = await req.json();

    const isValid =
      name && description && price !== null && menuCategoryIds.length > 0;

    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        price,
        description,
      },
    });

    // user ကပို့လိုက်တဲ့ menucategory နဲ့ database ထဲက menucategory တိုက်စစ်ပီး မတူတာဘဲဖျက်ထုတ်ပစ်
    await prisma.menuCategoryMenu.deleteMany({
      where: { menuCategoryId: { notIn: menuCategoryIds }, menuId: menu.id },
    });

    // menuId နဲ့သက်ဆိုင်တဲ့ menuCategory အကုန်ယူ
    const findMenuCategories = await prisma.menuCategoryMenu.findMany({
      where: { menuId: menu.id },
    });
    // menuId နဲ့သက်ဆိုင်တဲ့ menuCategory တေထဲက user ကပို့လိုက်တဲ မတူတဲ့menuCategory ကိုစစ်ထုတ်
    const menuCategoryIdsToCreate = menuCategoryIds.filter(
      (item: number) =>
        !findMenuCategories.some(
          (menuCategory) => menuCategory.menuCategoryId === item
        )
    );

    // စစ်ထုတ်လို့ရတာတေကို database ထဲမှာအသစ်အနေနဲ့ထပ်ထည့်ပေး
    await prisma.$transaction(
      menuCategoryIdsToCreate.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: {
            menuId: menu.id,
            menuCategoryId: itemId,
          },
        })
      )
    );

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuId: menu.id },
    });

    return NextResponse.json({ menu, menuCategoryMenus }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update menu" },
      { status: 500 }
    );
  }
}
