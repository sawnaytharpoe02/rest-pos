import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MenuSlice, CreateMenuPayload, UpdateMenuPayload } from "@/types/menu";
import { Menu } from "@prisma/client";
import { config } from "@/config";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuPayload) => {
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { menu } = await res.json();
      payload.onSuccess && payload.onSuccess();

      return menu;
    } catch (error) {
      console.log(error);
      payload.onError && payload.onError();
    }
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (data: UpdateMenuPayload, thunkApi) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      await res.json();
      // thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
      // onSuccess && onSuccess();

      // return menu;
    } catch (error) {
      console.log(error);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        state.error = null;
        state.menus = [...state.menus, action.payload];
      })
      .addCase(createMenu.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Create menu error occured");
        state.error = error.message;
      });

    builder
      .addCase(updateMenu.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        state.error = null;
        state.menus = state.menus.map((menu) =>
          menu.id === action.payload.id ? action.payload : menu
        );
      })
      .addCase(updateMenu.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Update menu error occured");
        state.error = error.message;
      });
  },
});

export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;
