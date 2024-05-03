import {
  AddonCategorySlice,
  DeleteAddonCategoryPayload,
  UpdateAddonCategoryPayload,
} from "@/types/addonCategory";
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
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon-categories`, {
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

export const updateAddonCategory = createAsyncThunk(
  "update/updateAddonCategory",
  async (data: UpdateAddonCategoryPayload, thunkApi) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/addon-categories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { updateAddonCategory, updateMenuAddonCategory } = await res.json();
      thunkApi.dispatch(replaceAddonCategory(updateAddonCategory));
      thunkApi.dispatch(setMenuAddonCategories(updateMenuAddonCategory));
      onSuccess && onSuccess();
      return updateAddonCategory;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "delete/deleteAddonCategory",
  async (payload: DeleteAddonCategoryPayload, thunkApi) => {
    const { id, onSuccess, onError } = payload;
    try {
      const res = await fetch(
        `${config.backofficeApiBaseUrl}/addon-categories?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const addonCategory = await res.json();
      thunkApi.dispatch(removeAddonCategory(addonCategory));
      onSuccess && onSuccess();
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
    removeAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.filter((category) =>
        category.id === action.payload.id ? false : true
      );
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
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

export const { setAddonCategories, removeAddonCategory, replaceAddonCategory } =
  addonCategorySice.actions;
export default addonCategorySice.reducer;
