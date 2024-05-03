import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ORDERSTATUS } from "@prisma/client";
import { nanoid } from "nanoid";
import { getCartTotalPrice } from "@/utils/generals";
import { CartItem } from "@/types/cart";

export async function GET(req: NextRequest) {
  try {
    const orderSeq = req.nextUrl.searchParams.get("orderSeq");
    const isValid = orderSeq;
    if (!isValid)
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });

    const orders = await prisma.order.findMany({
      where: { orderSeq },
    });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tableId, cartItems } = await req.json();
    const isValid = tableId && cartItems.length;
    if (!isValid) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [ORDERSTATUS.PENDING, ORDERSTATUS.COOKING] },
      },
    });
    const totalPrice = order
      ? getCartTotalPrice(cartItems) + order.totalPrice
      : getCartTotalPrice(cartItems);
    const orderSeq = order ? order.orderSeq : nanoid();

    for (const item of cartItems) {
      const cartItem = item as CartItem;
      const hasAddons = cartItem.addons.length > 0;

      if (hasAddons) {
        for (const addon of cartItem.addons) {
          await prisma.order.create({
            data: {
              tableId,
              orderSeq,
              totalPrice,
              itemId: cartItem.id,
              quantity: cartItem.quantity,
              status: ORDERSTATUS.PENDING,
              menuId: cartItem.menu.id,
              addonId: addon.id,
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            tableId,
            orderSeq,
            totalPrice,
            itemId: cartItem.id,
            quantity: cartItem.quantity,
            status: ORDERSTATUS.PENDING,
            menuId: cartItem.menu.id,
          },
        });
      }
    }

    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return NextResponse.json({ orders }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
