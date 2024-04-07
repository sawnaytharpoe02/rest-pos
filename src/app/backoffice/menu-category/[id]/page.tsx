"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Checkbox,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { UpdateMenuCategoryPayload } from "@/types/menuCategory";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slice/menuCategorySlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";

const MenuCategoryDetailPage = ({ params }: { params: { id: string } }) => {
  const menuCategoryId = Number(params.id);
  const router = useRouter();
  const [updateData, setUpdateData] = useState<UpdateMenuCategoryPayload>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (state) => state.disableLocationMenuCategory
  );
  const { menuCategories, isLoading } = useAppSelector(
    (state) => state.menuCategory
  );
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );

  const isAvailable = disableLocationMenuCategories.find(
    (item) =>
      item.menuCategoryId === menuCategoryId &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true;


  useEffect(() => {
    if (menuCategory) {
      setUpdateData({
        ...menuCategory,
        isAvailable,
        locationId: selectedLocation?.id,
      });
    }
  }, []);

  const handleUpdateMenuCategory = () => {
    const shouldUpdate =
      updateData?.name !== menuCategory?.name ||
      updateData?.isAvailable !== undefined;
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

  const handleDeleteMenuCategory = () => {
    dispatch(
      deleteMenuCategory({
        id: menuCategoryId,
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete menu category successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/menu-category");
        },
      })
    );
  };

  return (
    <div>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12}>
              <FormLabel>Name</FormLabel>
              <OutlinedInput
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
                    defaultChecked={isAvailable}
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
              <Button
                sx={{ color: "#000" }}
                variant="text"
                onClick={() => router.push("/backoffice/menu-category")}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <CommonDeleteDialog
        title="Delete Menu Category"
        content="Are you sure you want to delete this menu category?"
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        handleDelete={handleDeleteMenuCategory}
      />
    </div>
  );
};

export default MenuCategoryDetailPage;
