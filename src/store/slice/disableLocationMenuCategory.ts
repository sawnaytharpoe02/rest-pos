import { createSlice } from "@reduxjs/toolkit";
import { DisableLocationMenuCategorySlice } from "@/types/disableLocationMenuCategory";

const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  error: null,  
}

const disableLocationMenuCategorySlice = createSlice({
  name: 'disableLocationMenuCategory',
  initialState,
  reducers: {

  }
})


export const {} = disableLocationMenuCategorySlice.actions;
export default disableLocationMenuCategorySlice.reducer;