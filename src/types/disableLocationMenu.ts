import { BaseOptions } from "./user";
import { DisableLocationMenu } from "@prisma/client";

export interface DisableLocationMenuSlice extends BaseOptions {
  disableLocationMenus: DisableLocationMenu[];
  isLoading: boolean;
  error: string | null;
}
