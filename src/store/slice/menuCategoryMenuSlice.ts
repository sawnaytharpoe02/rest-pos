import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";

const initialState: MenuCategoryMenuSlice = {
  menuCategoryMenus: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (
      state,
      action: PayloadAction<MenuCategoryMenu[]>
    ) => {
      state.menuCategoryMenus = action.payload;
    },
  },
});

export const { setMenuCategoryMenus } = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
