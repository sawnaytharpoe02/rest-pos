import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySlice {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  error: string | null;
}
