import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarType = "success" | "error";

interface SnackbarSlice {
  type: SnackbarType;
  isOpen: boolean;
  message: string;
}

const initialState: SnackbarSlice = {
  type: "success",
  isOpen: false,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarSlice>) => {
      state.type = action.payload.type;
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
    },
    setHideSnackbar: (state) => {
      state.type = "success";
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { setSnackbar, setHideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
