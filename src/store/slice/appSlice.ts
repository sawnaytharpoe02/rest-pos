import { config } from "@/config";
import {
  PayloadAction,
  PayloadActionCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setLocations } from "./locationSlice";
import { Location } from "@prisma/client";
import { setDisableLocationMenuCategories } from "./disableLocationMenuCategorySlice";
import { setDisableLocationMenus } from "./disableLocationMenuSlice";
import { setAddonCategories } from "./addonCategorySlice";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";

interface AppSlice {
  init: boolean;
  isLoading: boolean;
  selectedLocation: Location | null;
  isError: string | null;
}

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  selectedLocation: null,
  isError: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await fetch(`${config.backofficeApiBaseUrl}/app`);
      const dataFromServer = await res.json();
      const {
        menus,
        menuCategories,
        company,
        menuCategoryMenus,
        locations,
        disableLocationMenuCategories,
        disableLocationMenus,
        addonCategories,
        menuAddonCategories,
      } = dataFromServer;

      thunkApi.dispatch(setMenuCategories(menuCategories));
      thunkApi.dispatch(setMenus(menus));
      thunkApi.dispatch(setCompany(company));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
      thunkApi.dispatch(setLocations(locations));

      if (localStorage.getItem("selectedLocationId")) {
        const selectedLocation = locations.find(
          (location: any) =>
            location.id === Number(localStorage.getItem("selectedLocationId"))
        ) as Location;
        thunkApi.dispatch(setSelectedLocation(selectedLocation));
      } else {
        thunkApi.dispatch(setSelectedLocation(locations[0]));
      }
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setLoading(false));
      thunkApi.dispatch(
        setDisableLocationMenuCategories(disableLocationMenuCategories)
      );
      thunkApi.dispatch(setDisableLocationMenus(disableLocationMenus));
      thunkApi.dispatch(setAddonCategories(addonCategories));
      thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
    } catch (error) {
      thunkApi.dispatch(setLoading(false));
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
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
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setSelectedLocation, setLoading } = appSlice.actions;
export default appSlice.reducer;
