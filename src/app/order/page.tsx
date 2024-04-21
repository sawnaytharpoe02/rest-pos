"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { fetchAppData } from "@/store/slice/appSlice";

const OrderPage = () => {
  const search = useSearchParams();
  const tableId = search.get("tableId") || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppData({ tableId }));
  }, []);

  return <div>This is order page {tableId}</div>;
};

export default OrderPage;
