import { config } from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setCompany } from "./companySlice";

interface AppSlice {
  init: boolean;
  isLoading: boolean;
  isError: string | null;
}

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  isError: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/app`);
      const dataFromServer = await res.json();
      const { menus, menuCategories, company } = dataFromServer;

      thunkApi.dispatch(setMenuCategories(menuCategories));
      thunkApi.dispatch(setMenus(menus));
      thunkApi.dispatch(setCompany(company));
      thunkApi.dispatch(setInit(true));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;
