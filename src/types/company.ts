import { Company } from "@prisma/client";

export interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  isError: null | string;
}

