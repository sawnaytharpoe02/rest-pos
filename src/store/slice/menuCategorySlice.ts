import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCategory } from "@prisma/client";
import {
  CreateMenuCategoryPayload,
  UpdateMenuCategoryPayload,
  DeleteMenuCategoryPayload,
  MenuCategorySlice,
} from "@/types/menuCategory";
import { config } from "@/config";

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  error: null,
};

export const createMenuCategory = createAsyncThunk(
  "create/createMenuCategory",
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
  "update/updateMenuCategory",
  async (payload: UpdateMenuCategoryPayload) => {
    const { onSuccess, onError } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu-category`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { updateMenuCategory } = await res.json();
      console.log(updateMenuCategory);
      onSuccess && onSuccess();
      return updateMenuCategory;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const deleteMenuCategory = createAsyncThunk(
  "delete/deleteMenuCategory",
  async (payload: DeleteMenuCategoryPayload, thunkApi) => {
    const { id, onSuccess, onError } = payload;
    try {
      const res = await fetch(
        `${config.backofficeApiBaseUrl}/menu-category?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const menuCategory = await res.json();
      thunkApi.dispatch(removeMenuCategory(menuCategory));
      onSuccess && onSuccess();
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
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.filter((menuCategory) =>
        menuCategory.id === action.payload.id ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createMenuCategory.fulfilled,
        (state, action: PayloadAction<MenuCategory>) => {
          state.isLoading = false;
          state.error = null;
          state.menuCategories = [...state.menuCategories, action.payload];
        }
      )
      .addCase(createMenuCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating menu category");
        state.error = error.message;
      });

    builder
      .addCase(updateMenuCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateMenuCategory.fulfilled,
        (state, action: PayloadAction<MenuCategory>) => {
          state.isLoading = false;
          state.error = null;
          state.menuCategories = state.menuCategories.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      )
      .addCase(updateMenuCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while updating menu category");
        state.error = error.message;
      });
  },
});

export const { setMenuCategories, removeMenuCategory } =
  menuCategorySlice.actions;
export default menuCategorySlice.reducer;
