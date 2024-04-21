import { BaseOptions } from "./user";
import { Location } from "@prisma/client";

export interface AppSlice {
  init: boolean;
  isLoading: boolean;
  selectedLocation: Location | null;
  isError: string | null;
}

export interface UploadAssetPayload extends BaseOptions {
  file: File;
}

export interface AppPayloadOptions {
  tableId?: string;
}
