"use client";

import { CartItem } from "@/types/cart";
import { getCartTotalPrice } from "@/utils/generals";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { removeCart } from "@/store/slice/cartSlice";
import { Icon } from "@iconify/react";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

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
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.name}
          </Typography>
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.price}
          </Typography>
        </Box>
      );
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeCart(cartItem));
  };

  // const confirmOrder = async () => {
  //   const isValid = tableId;
  //   if (!isValid) return alert("Table Id");
  //   dispatch(
  //     createOrder({
  //       tableId,
  //       cartItems,
  //       onSuccess: (orders: Order[]) => {
  //         router.push({
  //           pathname: `/order/active-order/${orders[0].orderSeq}`,
  //           query: { tableId },
  //         });
  //       },
  //     })
  //   );
  // };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        color={"primary.dark"}
        variant="h5"
        sx={{ fontSize: { md: 15, lg: 25 } }}>
        Review your order
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 5,
          borderRadius: "10",
        }}>
        <Box
          sx={{
            width: "900px",
            height: "auto",
            display: "grid",
            placeContent: "center",
          }}>
          {!cartItems.length ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <Box
              sx={{
                width: { xs: "100%", md: "500px" },
              }}>
              {cartItems.map((cartItem) => {
                const { menu, addons, quantity } = cartItem;
                return (
                  <Box key={cartItem.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 25,
                          height: 25,
                          mr: 1,
                          backgroundColor: "#1B9C85",
                        }}>
                        {quantity}
                      </Avatar>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}>
                        <Typography color={"primary"}>{menu.name}</Typography>
                        <Typography color={"primary"}>{menu.price}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ pl: 6 }}>{renderAddons(addons)}</Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 3,
                        mt: 1,
                      }}>
                      <Box>
                        <Icon
                          icon="fluent:delete-24-filled"
                          style={{ cursor: "pointer" }}
                          fontSize={22}
                          onClick={() => handleRemoveFromCart(cartItem)}
                        />
                      </Box>
                      <Box>
                        <Icon
                          icon="lucide:edit"
                          fontSize={22}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push(
                              `/order/menu/${menu.id}?cartItemId=${cartItem.id}`
                            )
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Typography color="primary" sx={{ fontSize: { sm: 22 } }}>
                  Total: {getCartTotalPrice(cartItems)}
                </Typography>
              </Box>
              <Box sx={{ mt: 3, textAlign: "center" }} onClick={() => {}}>
                <Button variant="contained">Confirm order</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
