"use client";

import { useState } from "react";
import { CartItem } from "@/types/cart";
import { getCartTotalPrice } from "@/utils/generals";
import { Box, Button, Divider, Typography, ButtonGroup } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { removeCart } from "@/store/slice/cartSlice";
import { Icon } from "@iconify/react";
import { createOrder } from "@/store/slice/orderSlice";
import Image from "next/image";

const OrderCarts = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const tableId = useAppSelector((state) => state.table.tables)[0]?.id;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography>{item.name}</Typography>
          <Typography>{item.price}</Typography>
        </Box>
      );
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeCart(cartItem));
  };

  const confirmOrder = () => {
    const isValid = tableId;
    if (!isValid) return null;
    dispatch(
      createOrder({
        tableId,
        cartItems,
        onSuccess: (orders: Order[]) => {
          router.push(`/order/active-order/${orders[0].orderSeq}`);
        },
      })
    );
  };

  return (
    <Box sx={{ width: "30vw", margin: "0 auto" }}>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Typography variant="h5" sx={{ fontSize: { md: 15, lg: 25 }, pt: 2 }}>
          My Cart
        </Typography>
        <Box
          sx={{
            width: "100%",
          }}>
          {!cartItems.length ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography>Your cart is empty.</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "520px",
                overflow: "auto",
                py: 2,
              }}>
              {cartItems.map((cartItem) => {
                const { menu, addons, quantity } = cartItem;
                return (
                  <Box key={cartItem.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <Image
                        src={cartItem.menu.assetUrl || ""}
                        alt="menu image"
                        width={75}
                        height={75}
                        priority={true}
                        style={{
                          borderRadius: "1rem",
                          backgroundSize: "cover",
                        }}
                      />
                      <Typography variant="h5" color={"primary"} sx={{ px: 3 }}>
                        {quantity}x
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            color: "primary.light",
                          }}>
                          <Typography>{menu.name}</Typography>
                          <Typography>{menu.price}</Typography>
                        </Box>
                        <Box>{renderAddons(addons)}</Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 1,
                        mb: 3,
                      }}>
                      <ButtonGroup size="small">
                        <Button
                          key="one"
                          sx={{ color: "primary.dark" }}
                          onClick={() =>
                            router.push(
                              `/order/menu/${menu.id}?cartItemId=${cartItem.id}`
                            )
                          }>
                          <Icon icon="fluent:edit-28-filled" fontSize={16} />
                        </Button>
                        <Button
                          key="two"
                          sx={{ color: "primary.dark" }}
                          onClick={() => handleRemoveFromCart(cartItem)}>
                          <Icon icon="fluent:delete-48-filled" fontSize={16} />
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {cartItems.length !== 0 && (
          <Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}>
              <Typography sx={{ fontSize: { sm: 20 }, fontWeight: "bold" }}>
                Total: {getCartTotalPrice(cartItems)}
              </Typography>
              <Button variant="contained" onClick={confirmOrder}>
                Confirm order
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderCarts;
