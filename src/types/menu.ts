import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface Menu extends BaseMenu {}

export interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  isError: null | string;
}

export interface CreateUpdateMenuPayload extends BaseMenu, BaseOptions {}
