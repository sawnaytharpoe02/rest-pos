import React, { useState } from "react";
import { Box, Typography, Badge, Drawer } from "@mui/material";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { Icon } from "@iconify/react";
import OrderCarts from "./OrderCarts";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  minWidth: "100%",
  height: "60px",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
}));

const LocationNameContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const OrderAppHeader = () => {
  const router = useRouter();

  const orders = useAppSelector((state) => state.order.orders);
  const table = useAppSelector((state) => state.table.tables);
  const location = useAppSelector((state) => state.location.locations).find(
    (item) => item.id === table[0]?.locationId
  );

  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenCartDrawer(newOpen);
  };

  const carts = useAppSelector((state) => state.cart.items);
  return (
    <>
      <HeaderContainer>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/order?tableId=${table[0].id}`)}>
          <Typography variant="h4">Forklore</Typography>
        </Box>
        <LocationNameContainer>
          <Typography variant="h6">
            {location?.name} ({location?.street})
          </Typography>
        </LocationNameContainer>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge color="primary" badgeContent={carts ? carts.length : ""}>
            <Icon
              style={{ cursor: "pointer" }}
              icon="fa6-solid:cart-plus"
              onClick={toggleDrawer(true)}
              fontSize={22}
            />
          </Badge>
          <Icon
            icon="pajamas:status-alert"
            fontSize={21}
            style={{ cursor: "pointer" }}
            onClick={() =>
              router.push(`/order/active-orders/${orders[0].orderSeq}`)
            }
          />
        </Box>
      </HeaderContainer>
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
