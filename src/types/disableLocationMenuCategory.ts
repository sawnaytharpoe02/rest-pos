import { BaseOptions } from "./user";
import { disableLocationMenuCategory } from "@prisma/client";

export interface DisableLocationMenuCategorySlice extends BaseOptions {
  disableLocationMenuCategories: disableLocationMenuCategory[];
  isLoading: boolean;
  error: string | null;
}