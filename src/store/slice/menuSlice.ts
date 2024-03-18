import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateUpdateMenuPayload, MenuSlice, Menu } from "@/types/menu";
import { config } from "@/config";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  isError: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateUpdateMenuPayload) => {
    try {
      const { name, price } = payload;
      const res = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
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

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, _action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.menus = [...state.menus, action.payload];
      })
      .addCase(createMenu.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Create menu error occured");
        state.isError = error.message;
      });
  },
});

export const {setMenus} = menuSlice.actions;
export default menuSlice.reducer;
