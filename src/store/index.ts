import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import menuCategoryReducer from "./slice/menuCategorySlice";
import dialogReducer from "./slice/appDialogSlice";
import snackbarReducer from "./slice/appSnackbarSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    dialog: dialogReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
