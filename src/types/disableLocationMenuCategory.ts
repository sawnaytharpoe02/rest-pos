import { BaseOptions } from "./user";
import { DisableLocationMenuCategory } from "@prisma/client";
export interface DisableLocationMenuCategorySlice extends BaseOptions {
  disableLocationMenuCategories: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: string | null;
}