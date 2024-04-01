import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationSlice, CreateLocationPayload } from "@/types/location";
import { config } from "@/config";
import { Location } from "@prisma/client";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (data: CreateLocationPayload, thunkApi) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/location`, {
        method: "POST",
        headers: { "Content-Type": "application-content/json" },
        body: JSON.stringify(payload),
      });

      const location = await res.json();
      onSuccess && onSuccess();
      console.log(res);
      return location;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLocation.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createLocation.fulfilled,
        (state, action: PayloadAction<Location>) => {
          state.isLoading = false;
          state.error = null;
          state.locations = [...state.locations, action.payload];
        }
      )
      .addCase(createLocation.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating location.");
        state.error = error.message;
      });
  },
});

export const {} = locationSlice.actions;
export default locationSlice.reducer;
