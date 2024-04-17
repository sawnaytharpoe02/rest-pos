import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "@prisma/client";
import { CompanySlice, UpdateCompanyPayload } from "@/types/company";
import { config } from "@/config";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  error: null,
};

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (data: UpdateCompanyPayload, thunkApi) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/company`, {
        method: "PUT",
        headers: { "Content-Type": "application-content/json" },
        body: JSON.stringify(payload),
      });

      const company = await res.json();
      thunkApi.dispatch(replaceCompany(company));
      onSuccess && onSuccess();
      return company;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
    replaceCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany, replaceCompany } = companySlice.actions;
export default companySlice.reducer;
