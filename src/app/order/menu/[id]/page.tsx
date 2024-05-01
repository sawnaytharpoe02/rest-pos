"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import React, { useState, useEffect } from "react";
import { appDataSelector } from "@/store/slice/appSlice";
import { shallowEqual } from "react-redux";
import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { Addon, Menu } from "@prisma/client";
import { Box, Typography, Button } from "@mui/material";
import { nanoid } from "nanoid";
import { addToCart } from "@/store/slice/cartSlice";
import { CartItem } from "@/types/cart";
import { useRouter, useSearchParams } from "next/navigation";

const MenuDetailPage = ({ params }: { params: { id: string } }) => {
  const menuId = Number(params.id);
  const search = useSearchParams();
  const cartItemId = search.get("cartItemId");
  const router = useRouter();

  const { menus, menuAddonCategories, addonCategories, carts } = useAppSelector(
    appDataSelector,
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const cartItem = carts.find((item) => item.id === cartItemId);

  const table = useAppSelector((state) => state.table.tables);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const menu = menus.find((item) => item.id === menuId) as Menu;
  const addonCategoryIds = menuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);
  const validAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );

  useEffect(() => {
    if (cartItem) {
      setSelectedAddons(cartItem.addons);
      setQuantity(cartItem.quantity);
      console.log(cartItem);
    }
  }, []);

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );

    const requiredSelectedAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });

    const isDisabled =
      requiredAddonCategories.length !== requiredSelectedAddons.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);

  const handleAddToCart = () => {
    if (!menu) return;

    const newCartItem: CartItem = {
      id: cartItem ? cartItem.id : nanoid(7),
      menu,
      addons: selectedAddons,
      quantity,
    };

    dispatch(addToCart(newCartItem));
    const pathname = cartItem ? "/order/cart" : "/order";
    router.push(`${pathname}?tableId=${table[0].id}`);
  };

  if (!menu) return null;

  return (
    <Box sx={{ maxWidth: "500px", margin: "5rem auto" }}>
      <Typography variant="h4">{menu.name}</Typography>
      <AddonCategories
        addonCategories={validAddonCategories}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      <Box sx={{ display: "grid", placeItems: "center", mb: 2 }}>
        <QuantitySelector
          value={quantity}
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) => (prev - 1 === 0 ? 1 : prev - 1))
          }
        />
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          disabled={isDisabled}
          onClick={handleAddToCart}>
          {cartItem ? "Update Add to Cart" : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default MenuDetailPage;
