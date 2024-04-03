import { BaseOptions } from "./user";
import { Menu } from "@prisma/client";
export interface CreateMenuPayload extends BaseOptions {
  name: string;
  price: number;
  description: string;
  assetUrl?: string;
  menuCategoryIds: number[];
}
export interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateMenuPayload extends Menu, BaseOptions {}

export interface DeleteMenuPayload extends BaseOptions {
  id: number;
}
