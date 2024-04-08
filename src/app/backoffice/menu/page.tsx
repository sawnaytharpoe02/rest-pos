"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuForm from "@/components/form/MenuForm";
import { CreateMenuPayload } from "@/types/menu";
import MenuCard from "./_components/MenuCard";
import { config } from "@/config";

const MenuPage = () => {
  const [menuData, setMenuData] = useState<CreateMenuPayload>({
    name: "",
    description: "",
    menuCategoryIds: [],
    price: 0,
  });

  const dispatch = useAppDispatch();
  const { menus, isLoading } = useAppSelector((state) => state.menu);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocatinMenu
  );
  const { selectedLocation } = useAppSelector((state) => state.app);
  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography> Menu Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Menu
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : (
            menus.map((item) => {
              const isAvailable = disableLocationMenus.find(
                (v) =>
                  v.menuId === item.id &&
                  v.locationId === selectedLocation?.id
              )
                ? false
                : true;
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                  <MenuCard
                    name={item.name}
                    description={item.description || ""}
                    price={item.price}
                    imageUrl={item.assetUrl || ""}
                    href={`${config.backofficeBaseUrl}/menu/${item.id}`}
                    isAvailable={isAvailable}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
      <CommonDialog formTitle="Create Menu Form">
        <MenuForm menuData={menuData} setMenuData={setMenuData} />
      </CommonDialog>
    </>
  );
};

export default MenuPage;
