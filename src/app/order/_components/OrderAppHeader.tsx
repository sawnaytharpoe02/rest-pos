import React, { useState } from "react";
import { Box, Typography, Badge, Drawer } from "@mui/material";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { Icon } from "@iconify/react";
import OrderCarts from "./OrderCarts";

const OrderAppHeader = () => {
  const table = useAppSelector((state) => state.table.tables);
  const location = useAppSelector((state) => state.location.locations).find(
    (item) => item.id === table[0]?.locationId
  );

  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenCartDrawer(newOpen);
  };

  console.log(openCartDrawer);

  const carts = useAppSelector((state) => state.cart.items);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          minWidth: "100%",
          height: "60px",
        }}>
        <Box>Foodie</Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h4">{location?.name}</Typography>
          <Typography variant="h6">{location?.street}</Typography>
        </Box>
        <Box>
          <Badge color="primary" badgeContent={carts ? carts.length : ""}>
            <Icon
              style={{ cursor: "pointer" }}
              icon="fa6-solid:cart-plus"
              onClick={toggleDrawer(true)}
              fontSize={22}
            />
          </Badge>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={openCartDrawer}
        onClose={toggleDrawer(false)}>
        <Box sx={{ width: "35vw" }} role="presentation">
          <OrderCarts />
        </Box>
      </Drawer>
    </>
  );
};

export default OrderAppHeader;
