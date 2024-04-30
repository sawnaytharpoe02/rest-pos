import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { Icon } from "@iconify/react";
import Link from "next/link";

const OrderAppHeader = () => {
  const table = useAppSelector((state) => state.table.tables);
  const location = useAppSelector((state) => state.location.locations).find(
    (item) => item.id === table[0]?.locationId
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        minWidth: "100%",
        height: "60px",
      }}>
      <Box>Foodie</Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">{location?.name}</Typography>
        <Typography variant="h6">({location?.street})</Typography>
      </Box>
      <Box>
        <Link href="/order/cart" style={{ cursor: "pointer" }}>
          <Icon icon="fa6-solid:cart-plus" fontSize={22} />
        </Link>
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
