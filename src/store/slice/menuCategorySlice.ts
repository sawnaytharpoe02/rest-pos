import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCategory } from "@prisma/client";
import {
  CreateMenuCategoryPayload,
  UpdateMenuCategoryPayload,
} from "@/types/menuCategory";
import { config } from "@/config";
import MenuCategoryCard from "@/components/card/MenuCategoryCard";

interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  isError: string | null;
}

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  isError: null,
};

export const createMenuCategory = createAsyncThunk(
  "create/menuCategory",
  async (payload: CreateMenuCategoryPayload) => {
    const { onSuccess, onError } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const menuCategory = await res.json();
      onSuccess && onSuccess();
      return menuCategory;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const updateMenuCategory = createAsyncThunk(
  "update/menuCategory",
  async (payload: UpdateMenuCategoryPayload) => {
    const { onSuccess, onError } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu-category`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const updatedMenuCategory = await res.json();
      onSuccess && onSuccess();
      return updatedMenuCategory;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        createMenuCategory.fulfilled,
        (state, action: PayloadAction<MenuCategory>) => {
          state.isLoading = false;
          state.isError = null;
          state.menuCategories = [...state.menuCategories, action.payload];
        }
      )
      .addCase(createMenuCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating menu category");
        state.isError = error.message;
      });

    builder
      .addCase(updateMenuCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        updateMenuCategory.fulfilled,
        (state, action: PayloadAction<MenuCategory>) => {
          state.isLoading = false;
          state.isError = null;
          state.menuCategories = state.menuCategories.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      )
      .addCase(updateMenuCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while updating menu category");
        state.isError = error.message;
      });
  },
});

export const { setMenuCategories } = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
