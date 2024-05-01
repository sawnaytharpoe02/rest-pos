import { config } from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppSlice, UploadAssetPayload, AppPayloadOptions } from "@/types/app";
import { Location } from "@prisma/client";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setLocations } from "./locationSlice";
import { setDisableLocationMenuCategories } from "./disableLocationMenuCategorySlice";
import { setDisableLocationMenus } from "./disableLocationMenuSlice";
import { setAddonCategories } from "./addonCategorySlice";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";
import { setAddons } from "./addonSlice";
import { setTables } from "./tableSlice";
import { RootState } from "..";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  selectedLocation: null,
  isError: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (payload: AppPayloadOptions, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));

      const { tableId } = payload;

      const apiUrl = tableId
        ? `${config.orderApiBaseUrl}/app?tableId=${tableId}`
        : `${config.backofficeApiBaseUrl}/app`;

      const res = await fetch(apiUrl);
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
        addons,
        tables,
      } = dataFromServer;

      thunkApi.dispatch(setMenuCategories(menuCategories));
      thunkApi.dispatch(setMenus(menus));
      thunkApi.dispatch(setCompany(company));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
      thunkApi.dispatch(setLocations(locations));

      const selectedLocationId = localStorage.getItem("selectedLocationId");

      if (selectedLocationId) {
        const ownLocation =
          selectedLocationId &&
          locations.find((item: any) => item.id === Number(selectedLocationId));

        if (!ownLocation) {
          localStorage.removeItem("selectedLocationId");
          localStorage.setItem(
            "selectedLocationId",
            locations[0].id.toString()
          );
          thunkApi.dispatch(setSelectedLocation(locations[0]));
          return;
        }
        const selectedLocation = locations.find(
          (location: any) =>
            location.id === Number(localStorage.getItem("selectedLocationId"))
        ) as Location;
        thunkApi.dispatch(setSelectedLocation(selectedLocation));
      } else {
        thunkApi.dispatch(setSelectedLocation(locations[0]));
      }

      thunkApi.dispatch(setLoading(false));
      thunkApi.dispatch(
        setDisableLocationMenuCategories(disableLocationMenuCategories)
      );
      thunkApi.dispatch(setDisableLocationMenus(disableLocationMenus));
      thunkApi.dispatch(setAddonCategories(addonCategories));
      thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
      thunkApi.dispatch(setAddons(addons));
      thunkApi.dispatch(setTables(tables));

      thunkApi.dispatch(setInit(true));
    } catch (error) {
      thunkApi.dispatch(setLoading(false));
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const uploadAssset = createAsyncThunk(
  "app/uploadAssset",
  async (payload: UploadAssetPayload) => {
    const { onSuccess, file } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.backofficeApiBaseUrl}/asset`, {
      method: "POST",
      body: formData,
    });

    const assetUrl = await response.json();
    onSuccess && onSuccess(assetUrl);
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

export const appDataSelector = (state: RootState) => {
  return {
    selectedLocation: state.app.selectedLocation,
    menus: state.menu.menus,
    menuCategories: state.menuCategory.menuCategories,
    addonCategories: state.addonCategory.addonCategories,
    addons: state.addon.addons,
    locations: state.location.locations,
    company: state.company.company,
    menuAddonCategories: state.menuAddonCategory.menuAddonCategories,
    disableLocationMenus: state.disableLocatinMenu.disableLocationMenus,
    disableLocationMenuCategories:
      state.disableLocationMenuCategory.disableLocationMenuCategories,
    menuCategoryMenus: state.menuCategoryMenu.menuCategoryMenus,
    tables: state.table.tables,
    carts: state.cart.items,
  };
};
export default appSlice.reducer;
