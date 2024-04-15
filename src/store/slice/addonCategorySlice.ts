import { AddonCategorySlice } from "@/types/addonCategory";
import { AddonCategory } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
import { config } from "@/config";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";

const initialState: AddonCategorySlice = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "create/createAddonCategory",
  async (payload: CreateAddonCategoryPayload, thunkApi) => {
    const { onSuccess, onError } = payload;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { addonCategory, menuAddonCategory } = await res.json();
      thunkApi.dispatch(setMenuAddonCategories(menuAddonCategory));
      onSuccess && onSuccess();
      return addonCategory;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

const addonCategorySice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddonCategory.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createAddonCategory.fulfilled,
        (state, action: PayloadAction<AddonCategory>) => {
          state.isLoading = false;
          state.error = null;
          state.addonCategories = [...state.addonCategories, action.payload];
        }
      )
      .addCase(createAddonCategory.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating addon category");
        state.error = error.message;
      });
  },
});

export const { setAddonCategories } = addonCategorySice.actions;
export default addonCategorySice.reducer;
