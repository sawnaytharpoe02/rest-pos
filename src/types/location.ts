import { BaseOptions } from "./user";
import { Location } from "@prisma/client";

export interface CreateLocationPayload extends BaseOptions {
  name: string;
  street: string;
  township: string;
  city: string;
  companyId?: number;
}

export interface LocationSlice {
  locations: Location[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateLocationPayload extends Location, BaseOptions {}

export interface DeleteLocationPayload extends BaseOptions{
  id: number;
}
