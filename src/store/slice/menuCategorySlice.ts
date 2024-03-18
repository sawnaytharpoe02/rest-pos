import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCategorySlice, MenuCategory } from "@/types/menuCategory";
import { CreateUpdateMenuCategoryPayload } from "@/types/menuCategory";
import { config } from "@/config";

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  isError: null,
};

export const createMenuCategory = createAsyncThunk(
  "create/menuCategory",
  async (payload: CreateUpdateMenuCategoryPayload) => {
    try {
      const { name, isAvailable } = payload;
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isAvailable }),
      });

      const { menuCategory } = await res.json();
      console.log(menuCategory);
      payload.onSuccess && payload.onSuccess();
      return menuCategory;
    } catch (error) {
      console.log(error);
      payload.onError && payload.onError();
    }
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createMenuCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.menuCategories = [...state.menuCategories, action.payload];
      })
      .addCase(createMenuCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating menu category");
        state.isError = error.message;
      });
  },
});

export const {setMenuCategories} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
