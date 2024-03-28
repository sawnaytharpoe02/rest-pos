import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import menuCategoryReducer from "./slice/menuCategorySlice";
import dialogReducer from "./slice/appDialogSlice";
import snackbarReducer from "./slice/appSnackbarSlice";
import companyReducer from "./slice/companySlice";
import appReducer from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    company: companyReducer,
    dialog: dialogReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
