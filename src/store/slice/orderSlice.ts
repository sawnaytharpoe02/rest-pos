import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";
import { OrderSlice } from "@/types/order";

const initialState: OrderSlice = {
  orders: [],
  isLoading: false,
  error: null,
};

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

export const {} = orderSlice.actions;
export default orderSlice.reducer;
