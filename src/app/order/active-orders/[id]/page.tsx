"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { Box, Typography } from "@mui/material";
import OrderCard from "@/components/OrderCard";
import { appDataSelector } from "@/store/slice/appSlice";
import { shallowEqual } from "react-redux";
import { refreshOrder } from "@/store/slice/orderSlice";
import { formatOrders } from "@/utils/generals";

const ActiveOrderPage = ({ params }: { params: { orderSeq: string } }) => {
  const orderSeq = params.orderSeq;
  const { tables, orders, addons, menus } = useAppSelector(
    appDataSelector,
    shallowEqual
  );

  const orderItems = formatOrders(orders, addons, menus, tables);
  const table = tables.find((table) => table.id === tables[0]?.id);
  const dispatch = useAppDispatch();
  let intervalId: number;

  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(handleRefreshOrder, 10000);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrder({ orderSeq: String(orderSeq) }));
  };

  if (!orders.length) return null;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 15,
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          sx={{
            color: { xs: "success.main", md: "primary.dark" },
            fontSize: { xs: 20, md: 25 },
          }}>
          Table: {table?.name}
        </Typography>
        <Typography
          sx={{
            color: { xs: "success.main", md: "primary.dark" },
            fontSize: { xs: 20, md: 25 },
          }}>
          Total price: {orders[0].totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveOrderPage;
