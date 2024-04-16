import { BaseOptions } from "./user";
import { Addon } from "@prisma/client";

export interface CreateAddonPayload extends BaseOptions {
  name: string;
  price: number;
  addonCategoryId?: number;
}
export interface AddonSlice {
  addons: Addon[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateAddonPayload extends Addon, BaseOptions {}

export interface DeleteAddonPayload extends BaseOptions {
  id: number;
}
