import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";
import {
  OrderSlice,
  CreateOrderOptions,
  RefreshOrderOptions,
  UpdateOrderOptions
} from "@/types/order";
import { config } from "@/config";
import { emptyCart } from "./cartSlice";

const initialState: OrderSlice = {
  orders: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItems, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.orderApiBaseUrl}/menus`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const { orders } = await response.json();

      thunkApi.dispatch(emptyCart());
      thunkApi.dispatch(setOrders(orders));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (options: UpdateOrderOptions, thunkApi) => {
    const { itemId, status, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.backofficeApiBaseUrl}/orders?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrderOptions, thunkApi) => {
    const { orderSeq, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.orderApiBaseUrl}/menus?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setIsLoading, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
