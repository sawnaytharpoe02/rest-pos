import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  MenuSlice,
  CreateMenuPayload,
  UpdateMenuPayload,
  DeleteMenuPayload,
} from "@/types/menu";
import { Menu } from "@prisma/client";
import { config } from "@/config";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setDisableLocationMenus } from "./disableLocationMenuSlice";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuPayload, thunkApi) => {
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { menu, menuCategoryMenus } = await res.json();

      thunkApi.dispatch(addMenu(menu));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
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
      const res = await fetch(`${config.backofficeApiBaseUrl}/menus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { menu, menuCategoryMenus, disableLocationMenus } =
        await res.json();

      thunkApi.dispatch(editMenu(menu));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
      thunkApi.dispatch(setDisableLocationMenus(disableLocationMenus));
      onSuccess && onSuccess();

      return menu;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (payload: DeleteMenuPayload, thunkApi) => {
    const { onSuccess, onError, id } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/menus?id=${id}`, {
        method: "DELETE",
      });

      const menu = await res.json();
      thunkApi.dispatch(removeMenu(menu));
      onSuccess && onSuccess();
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
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.filter((menu) =>
        menu.id === action.payload.id ? false : true
      );
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
    },
    editMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.map((menu) =>
        menu.id === action.payload?.id ? action.payload : menu
      );
    },
  },
});

export const { setMenus, removeMenu, addMenu, editMenu } = menuSlice.actions;
export default menuSlice.reducer;
