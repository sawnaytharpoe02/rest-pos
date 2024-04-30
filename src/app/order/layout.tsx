"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { Box } from "@mui/material";
import { fetchAppData } from "@/store/slice/appSlice";
import OrderAppFooter from "./_components/OrderAppFooter";
import OrderAppHeader from "./_components/OrderAppHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const search = useSearchParams();
  const tableId = search.get("tableId") || "";
  const dispatch = useAppDispatch();
  const { init, isLoading } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (tableId && !init) {
      dispatch(fetchAppData({ tableId }));
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <OrderAppHeader />
      <Box>{isLoading ? <Box>loading...</Box> : children}</Box>
      <OrderAppFooter />
    </Box>
  );
}
