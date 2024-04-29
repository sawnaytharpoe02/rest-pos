"use client";

import React, { useState, useEffect, useMemo } from "react";
import styled from "@mui/system/styled";
import Card, { CardProps } from "@mui/material/Card";
import { CardContent, CardActions } from "@mui/material";
import { Grid, Button } from "@mui/material";
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

const CustomMenuCard = styled(Card)<CardProps>(({ theme }) => ({
  width: "100%",
  height: "250px",
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.primary.main}`,
}));

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
      // const href = { pathname: `/order/menu/${item.id}`, query };
      return (
        <Grid item xs={6} sm={3} md={2} lg={2} key={item.id}>
          <Link href={`/order/menu/${item.id}`}>
            <CustomMenuCard>
              <CardContent>
                <Typography>{item.name}</Typography>
                <Image
                  src={item.assetUrl || ""}
                  alt="menu img"
                  width={200}
                  height={150}
                  priority={true}
                  style={{ backgroundSize: "cover" }}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained">Add to Cart</Button>
              </CardActions>
            </CustomMenuCard>
          </Link>
        </Grid>
      );
    });
  }, [selectedMenuCategory]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(evt, value) => setValue(value)}
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
        <Grid container gap={2} mt={2}>
          {renderMenus}
        </Grid>
      </Box>
    </div>
  );
};

export default OrderPage;
