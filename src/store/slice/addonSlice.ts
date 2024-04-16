import {
  AddonSlice,
  CreateAddonPayload,
  DeleteAddonPayload,
  UpdateAddonPayload,
} from "@/types/addon";
import { Addon } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: CreateAddonPayload, thunkApi) => {
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const addon = await res.json();

      payload.onSuccess && payload.onSuccess();

      return addon;
    } catch (error) {
      console.log(error);
      payload.onError && payload.onError();
    }
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (data: UpdateAddonPayload, thunkApi) => {
    const { onSuccess, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const addon = await res.json();

      thunkApi.dispatch(replaceAddon(addon));
      onSuccess && onSuccess();

      return addon;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (payload: DeleteAddonPayload, thunkApi) => {
    const { onSuccess, id } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon?id=${id}`, {
        method: "DELETE",
      });

      const addon = await res.json();

      thunkApi.dispatch(removeAddon(addon));
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((addon) =>
        addon.id === action.payload.id ? action.payload : addon
      );
    },
    removeAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.filter((addon) =>
        addon.id === action.payload.id ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddon.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAddon.fulfilled, (state, action: PayloadAction<Addon>) => {
        state.isLoading = false;
        state.error = null;
        state.addons = [...state.addons, action.payload];
      })
      .addCase(createAddon.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Create addon error occured");
        state.error = error.message;
      });
  },
});

export const { setAddons, replaceAddon, removeAddon } = addonSlice.actions;
export default addonSlice.reducer;
