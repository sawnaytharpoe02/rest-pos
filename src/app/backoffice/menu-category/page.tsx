"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuCategoryForm from "@/components/form/MenuCategoryForm";
import MenuCategoryCard from "@/components/card/MenuCategoryCard";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { config } from "@/config";

const MenuCategoryPage = () => {
  const { menuCategories } = useAppSelector((state) => state.menuCategory);

  const [menuCategoryData, setMenuCategoryData] =
    useState<CreateMenuCategoryPayload>({
      name: "",
      isAvailable: true,
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
          {menuCategories &&
            menuCategories.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                <MenuCategoryCard
                  title={item.name}
                  subTitle="description"
                  icon={<Icon icon="mingcute:fork-spoon-fill" />}
                  href={`${config.backofficeBaseUrl}/menu-category/${item.id}`}
                />
              </Grid>
            ))}
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
