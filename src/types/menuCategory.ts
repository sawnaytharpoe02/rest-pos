import { BaseOptions } from "./user";
import { MenuCategory } from "@prisma/client";
export interface CreateMenuCategoryPayload extends BaseOptions {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}

export interface UpdateMenuCategoryPayload extends BaseOptions {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}
export interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  error: string | null;
}
