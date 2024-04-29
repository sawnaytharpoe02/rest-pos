import { Order } from "@prisma/client";
import { BaseOptions } from "./user";

export interface OrderSlice {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}