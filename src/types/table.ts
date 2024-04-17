import { BaseOptions } from "./user";
import { Table } from "@prisma/client";

export interface CreateTablePayload extends BaseOptions {
  name: string;
  assetUrl?: string;
  locationId: number;
}

export interface TableSlice {
  tables: Table[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateTablePayload extends Table, BaseOptions {}

export interface DeleteTablePayload extends BaseOptions {
  id: number;
}
