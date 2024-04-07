import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisableLocationMenuCategorySlice } from "@/types/disableLocationMenuCategory";
import { DisableLocationMenuCategory } from "@prisma/client";

const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuCategorySlice = createSlice({
  name: "disableLocationMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategories: (
      state,
      action: PayloadAction<DisableLocationMenuCategory[]>
    ) => {
      state.disableLocationMenuCategories = action.payload;
    },
  },
});

export const { setDisableLocationMenuCategories } =
  disableLocationMenuCategorySlice.actions;
export default disableLocationMenuCategorySlice.reducer;
