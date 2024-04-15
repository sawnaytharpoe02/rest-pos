"use client";

import React, { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
import { config } from "@/config";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import AddonCategoryForm from "@/components/form/AddonCategoryForm";

const AddonCategoryPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, addonCategories } = useAppSelector(
    (state) => state.addonCategory
  );

  const [addonCategoryData, setAddonCategoryData] =
    useState<CreateAddonCategoryPayload>({
      name: "",
      isRequired: true,
      menuIds: undefined,
    });

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
          <Typography> Addon Category Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Addon Category
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            addonCategories.map((item) => {
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                  {item.name}
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
      <CommonDialog formTitle="Create Addon Category Form">
        <AddonCategoryForm
        addonCategoryData={addonCategoryData} setAddonCategoryData={setAddonCategoryData}/>
      </CommonDialog>
    </>
  );
};

export default AddonCategoryPage;
