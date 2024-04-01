
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanySlice } from "@/types/company";
import { Company } from "@prisma/client";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
