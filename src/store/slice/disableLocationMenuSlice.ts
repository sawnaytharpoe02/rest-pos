import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisableLocationMenuSlice } from "@/types/disableLocationMenu";
import { DisableLocationMenu } from "@prisma/client";

const initialState: DisableLocationMenuSlice = {
  disableLocationMenus: [],
  isLoading: false,
  error: null,
};

export const disableLocationMenuSlice = createSlice({
  name: "disableLocationMenu",
  initialState,
  reducers: {
    setDisableLocationMenus: (
      state,
      action: PayloadAction<DisableLocationMenu[]>
    ) => {
      state.disableLocationMenus = action.payload;
    },
  },
});

export const { setDisableLocationMenus } = disableLocationMenuSlice.actions;
export default disableLocationMenuSlice.reducer;
