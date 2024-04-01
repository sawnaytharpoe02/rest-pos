import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuSlice{
  menuCategoryMenus: MenuCategoryMenu[];
  isLoading: boolean;
  error: string | null;
}



