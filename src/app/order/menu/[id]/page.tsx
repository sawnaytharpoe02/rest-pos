"use client";

import { useAppSelector } from "@/store/hook";
import React, { useState, useEffect } from "react";
import { appDataSelector } from "@/store/slice/appSlice";
import { shallowEqual } from "react-redux";
import AddonCategories from "@/components/AddonCategories";
import { Addon, Menu } from "@prisma/client";
import { Box, Typography, Button } from "@mui/material";

const MenuDetailPage = ({ params }: { params: { id: string } }) => {
  const menuId = Number(params.id);
  const { menus, menuAddonCategories, addonCategories, addons } =
    useAppSelector(appDataSelector, shallowEqual);

  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const menu = menus.find((item) => item.id === menuId) as Menu;

  const addonCategoryIds = menuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const validAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );

    const requiredSelectedAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find((item) => item.id === selectedAddon.addonCategoryId);
      return addonCategory?.isRequired ? true : false;
    })

    const isDisabled =
      requiredAddonCategories.length !== requiredSelectedAddons.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);

  console.log(addons);
  console.log(selectedAddons);

  return (
    <Box>
      <Typography variant="h4">{menu.name}</Typography>
      <AddonCategories
        addonCategories={validAddonCategories}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      <Button variant="contained" disabled={isDisabled}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default MenuDetailPage;
