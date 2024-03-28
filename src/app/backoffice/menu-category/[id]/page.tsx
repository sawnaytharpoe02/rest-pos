"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { UpdateMenuCategoryPayload } from "@/types/menuCategory";
import { updateMenuCategory } from "@/store/slice/menuCategorySlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";

const MenuCategoryDetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = Number(pathname.split("/")[3]);
  const [updateData, setUpdateData] = useState<UpdateMenuCategoryPayload>();

  const dispatch = useAppDispatch();
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { isLoading } = useAppSelector((state) => state.menuCategory);
  const menuCategory = menuCategories.find((item) => item.id === id);

  useEffect(() => {
    if (menuCategory) {
      setUpdateData(menuCategory);
    }
  }, []);

  const handleUpdateMenuCategory = () => {
    const shouldUpdate =
      updateData?.name !== menuCategory?.name ||
      updateData?.isAvailable !== menuCategory?.isAvailable;
    if (!shouldUpdate) {
      return router.push("/backoffice/menu-category");
    }
    updateData &&
      dispatch(
        updateMenuCategory({
          ...updateData,
          onSuccess: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Update menu category successfully",
                })
              );
            }, 1000);
            router.push("/backoffice/menu-category");
          },
          onError: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "error",
                  isOpen: true,
                  message: "Error occured while updating menu category",
                })
              );
            }, 1000);
          },
        })
      );
  };

  if (!updateData) {
    return <Typography>Menu category not found</Typography>;
  }

  return (
    <div>
      <Grid width={350} container sx={{ p: 4 }}>
        <Grid item xs={12}>
          <TextField
            label="Category Name"
            value={updateData.name}
            onChange={(e) =>
              setUpdateData({ ...updateData, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={updateData.isAvailable}
                onChange={(e, value) =>
                  setUpdateData({ ...updateData, isAvailable: value })
                }
              />
            }
            label="Available"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            startIcon={
              isLoading && <CircularProgress color="inherit" size={20} />
            }
            variant="contained"
            onClick={handleUpdateMenuCategory}>
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuCategoryDetailPage;
