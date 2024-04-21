"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuCategoryForm from "@/components/form/MenuCategoryForm";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { config } from "@/config";
import CommonCard from "@/components/card/CommonCard";
import { appDataSelector } from "@/store/slice/appSlice";

const MenuCategoryPage = () => {
  const { menuCategories, selectedLocation, disableLocationMenuCategories } =
    useAppSelector(appDataSelector);

  const [menuCategoryData, setMenuCategoryData] =
    useState<CreateMenuCategoryPayload>({
      name: "",
      isAvailable: true,
      companyId: undefined,
    });

  const dispatch = useAppDispatch();
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
          <Typography> Menu Category Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Menu Category
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {menuCategories.map((item) => {
            const isAvailable = disableLocationMenuCategories.find(
              (v) =>
                v.menuCategoryId === item.id &&
                v.locationId === selectedLocation?.id
            )
              ? false
              : true;
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                <CommonCard
                  name={item.name}
                  icon="mingcute:fork-spoon-fill"
                  href={`${config.backofficeBaseUrl}/menu-category/${item.id}`}
                  isAvailable={isAvailable}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <CommonDialog formTitle="Create Menu Category Form">
        <MenuCategoryForm
          menuCategoryData={menuCategoryData}
          setMenuCategoryData={setMenuCategoryData}
        />
      </CommonDialog>
    </>
  );
};

export default MenuCategoryPage;
