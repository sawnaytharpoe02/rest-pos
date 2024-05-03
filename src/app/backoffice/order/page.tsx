"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import OrderCard from "@/components/OrderCard";
import { appDataSelector } from "@/store/slice/appSlice";
import { updateOrder } from "@/store/slice/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utils/generals";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

const OrdersPage = () => {
  const { orders, addons, menus, tables } = useAppSelector(
    appDataSelector,
    shallowEqual
  );
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (orders?.length) {
      const filteredOrder = formatOrders(orders, addons, menus, tables).filter(
        (orderItem) => orderItem.status === value
      );
      setFilteredOrders(filteredOrder);
    }
  }, [orders, value]);

  const handleOrderStatusUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(updateOrder({ itemId, status }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={(evt, value) => setValue(value)}>
          <ToggleButton value={ORDERSTATUS.PENDING}>
            {ORDERSTATUS.PENDING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            {ORDERSTATUS.COOKING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETE}>
            {ORDERSTATUS.COMPLETE}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}>
        {filteredOrders.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin
              handleOrderStatusUpdate={handleOrderStatusUpdate}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default OrdersPage;
