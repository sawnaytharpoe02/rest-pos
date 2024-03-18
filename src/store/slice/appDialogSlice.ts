import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DialogSlice {
  isOpenDialog: boolean;
}

const initialState: DialogSlice = {
  isOpenDialog: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenDialog = action.payload;
    },
  },
});

export const { setOpenDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
