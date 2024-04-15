import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";

const initialState: MenuAddonCategorySlice = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};
const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
  },
});

export const { setMenuAddonCategories } = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
