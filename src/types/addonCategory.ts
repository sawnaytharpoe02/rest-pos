import { BaseOptions } from "./user";
import { AddonCategory } from "@prisma/client";

export interface CreateAddonCategoryPayload extends BaseOptions {
  name: string;
  isRequired: boolean;
  menuIds?: number[];
}

export interface UpdateAddonCategoryPayload extends BaseOptions {
  name: string;
  isRequired: boolean;
  menuIds?: number[];
}
export interface AddonCategorySlice {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  error: string | null;
}

export interface DeleteAddonCategoryPayload extends BaseOptions {
  id: number;
}
