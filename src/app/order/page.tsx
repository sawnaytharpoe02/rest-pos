"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Grid,Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/store/hook";
import { appDataSelector } from "@/store/slice/appSlice";
import { shallowEqual } from "react-redux";
import { MenuCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const OrderPage = () => {
  const { menuCategories, menus, menuCategoryMenus } = useAppSelector(
    appDataSelector,
    shallowEqual
  );
  const [value, setValue] = useState<number>(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = useMemo(() => {
    const validMenuIds = menuCategoryMenus
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);
    const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

    return validMenus.map((item) => {
      return (
        <Grid item xs={6} sm={4} md={4} lg={3} key={item.id}>
          <Link href={`/order/menu/${item.id}`} style={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 150,
                  mb: 1,
                }}>
                <Image
                  src={item.assetUrl || ""}
                  alt="menu img"
                  layout="fill"
                  priority={true}
                  style={{
                    position: "absolute",
                    backgroundSize: "cover",
                    borderRadius: "1rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="column">
                  <Typography>{item.name}</Typography>
                  <Typography
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}>
                    {item.description}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${item.price}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Link>
        </Grid>
      );
    });
  }, [selectedMenuCategory]);

  return (
    <div>
      <Box sx={{ width: "70vw", p: 4, margin: "0 auto" }}>
        <Box>
          <Tabs
            value={value}
            onChange={(evt, value) => setValue(value)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="menu category">
            {menuCategories.map((menuCategory) => (
              <Tab
                key={menuCategory.id}
                label={menuCategory.name}
                onClick={() => setSelectedMenuCategory(menuCategory)}
              />
            ))}
          </Tabs>
        </Box>
        <Grid container gap={2} m={2}>
          {renderMenus}
        </Grid>
      </Box>
    </div>
  );
};

export default OrderPage;
