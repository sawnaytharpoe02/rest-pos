import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LocationSlice,
  CreateLocationPayload,
  UpdateLocationPayload,
  DeleteLocationPayload,
} from "@/types/location";
import { config } from "@/config";
import { Location } from "@prisma/client";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (data: CreateLocationPayload) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/locations`, {
        method: "POST",
        headers: { "Content-Type": "application-content/json" },
        body: JSON.stringify(payload),
      });

      const location = await res.json();
      onSuccess && onSuccess();
      return location;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (data: UpdateLocationPayload) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/locations`, {
        method: "PUT",
        headers: { "Content-Type": "application-content/json" },
        body: JSON.stringify(payload),
      });

      const location = await res.json();
      onSuccess && onSuccess();
      return location;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (data: DeleteLocationPayload, thunkApi) => {
    const { onSuccess, onError, id } = data;
    try {
      const res = await fetch(
        `${config.backofficeApiBaseUrl}/locations?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const location = await res.json();
      thunkApi.dispatch(removeLocation(location));

      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    removeLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.filter((location) =>
        location.id === action.payload.id ? false : true
      );
    },
  },
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

    builder
      .addCase(updateLocation.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateLocation.fulfilled,
        (state, action: PayloadAction<Location>) => {
          state.isLoading = false;
          state.error = null;
          state.locations = state.locations.map((location) =>
            location.id === action.payload.id ? action.payload : location
          );
        }
      )
      .addCase(updateLocation.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while updating location.");
        state.error = error.message;
      });
  },
});

export const { setLocations, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
