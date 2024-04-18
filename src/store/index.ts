import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import menuCategoryReducer from "./slice/menuCategorySlice";
import dialogReducer from "./slice/appDialogSlice";
import snackbarReducer from "./slice/appSnackbarSlice";
import companyReducer from "./slice/companySlice";
import menuCategoryMenuReducer from "./slice/menuCategoryMenuSlice";
import locationReducer from "./slice/locationSlice";
import disableLocationMenuCategoryReducer from "./slice/disableLocationMenuCategorySlice";
import disableLocationMenuReducer from "./slice/disableLocationMenuSlice";
import addonCategorySliceReducer from "./slice/addonCategorySlice";
import menuAddonCategorySliceReduer from "./slice/menuAddonCategorySlice";
import addonSliceReducer from "./slice/addonSlice";
import tableSliceReducer from "./slice/tableSlice";
import appReducer from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    company: companyReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    location: locationReducer,
    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    disableLocatinMenu: disableLocationMenuReducer,
    addonCategory: addonCategorySliceReducer,
    menuAddonCategory: menuAddonCategorySliceReduer,
    addon: addonSliceReducer,
    table: tableSliceReducer,
    dialog: dialogReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
