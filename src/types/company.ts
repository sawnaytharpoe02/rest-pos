import { BaseOptions } from "./user";
import { Company } from "@prisma/client";

export interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  error: string | null;
}

export interface UpdateCompanyPayload extends Company, BaseOptions {}
