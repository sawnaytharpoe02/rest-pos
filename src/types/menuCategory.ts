import { BaseOptions } from "./user";

export interface BaseMenuCategory {
  name: string;
  isAvailable: boolean;
}

export interface MenuCategory extends BaseMenuCategory {}

export interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  isError: null | string;
}

export interface CreateUpdateMenuCategoryPayload extends BaseMenuCategory, BaseOptions {}
