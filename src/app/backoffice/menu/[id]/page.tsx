"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  OutlinedInput,
  CircularProgress,
  Checkbox,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import { UpdateMenuPayload } from "@/types/menu";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { deleteMenu, updateMenu } from "@/store/slice/menuSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { Menu, MenuCategory } from "@prisma/client";
import MultiSelect from "@/components/MultiSelect";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = -100;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MenuDetailPage = ({ params }: { params: { id: string } }) => {
  const menuId = Number(params.id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { menus, isLoading } = useAppSelector((state) => state.menu);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocatinMenu
  );

  const [updateData, setUpdateData] = useState<UpdateMenuPayload>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const menu = menus.find((menu: Menu) => menu.id === menuId);

  const selectedMenuCategoryIds = menuCategoryMenus
    .filter((item) => item.menuId === menuId)
    .map((item) => {
      const menuCategory = menuCategories.find(
        (category) => category.id === item.menuCategoryId
      ) as MenuCategory;
      return menuCategory.id;
    });

  const isAvailable = disableLocationMenus.find(
    (item) => item.locationId === selectedLocation?.id && item.menuId === menuId
  )
    ? false
    : true;

  useEffect(() => {
    if (menu) {
      setUpdateData({
        ...menu,
        locationId: selectedLocation?.id,
      });
      selectedMenuCategoryIds.length > 0 &&
        setSelectedIds(selectedMenuCategoryIds);
    }
  }, [menu]);

  if (!updateData) {
    return <Typography>Menu not found</Typography>;
  }

  const handleUpdateMenu = async () => {
    if (selectedIds.length === 0) {
      return dispatch(
        setSnackbar({
          type: "error",
          isOpen: true,
          message: "Pease select at least one menu category",
        })
      );
    }

    const payload = {
      ...updateData,
      menuCategoryIds: selectedIds,
    };

    dispatch(
      updateMenu({
        ...payload,
        onSuccess: () => {
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Update menu successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/menu");
        },
        onError: () => {
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "error",
                isOpen: true,
                message: "Error occured while updating menu",
              })
            );
          });
        },
      })
    );
  };

  const handleDeleteMenu = () => {
    dispatch(
      deleteMenu({
        id: menuId,
        onSuccess: () => {
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete menu successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/menu");
        },
        onError: () => {
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "error",
                isOpen: true,
                message: "Error occured while updating menu",
              })
            );
          });
        },
      })
    );
  };

  return (
    <Box>
      <Grid container width={"100%"}>
        <Grid item xs={6}>
          <Grid width={350} container sx={{ px: 4, gap: 2 }}>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Price</FormLabel>
                <OutlinedInput
                  value={updateData.price}
                  type="number"
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      price: Number(e.target.value),
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Description</FormLabel>
                <OutlinedInput
                  value={updateData.description}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MultiSelect
                title="Menu Category"
                selected={selectedIds}
                setSelected={(selectedValues: number[]) =>
                  setSelectedIds(selectedValues)
                }
                items={menuCategories}
              />
            </Grid>
            <Grid item xs={12} sx={{ my: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={isAvailable}
                    onChange={(e, value) => {
                      setUpdateData({
                        ...updateData,
                        isAvailable: value,
                      });
                    }}
                  />
                }
                label="Available"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                startIcon={
                  isLoading && <CircularProgress color="inherit" size={20} />
                }
                variant="contained"
                onClick={handleUpdateMenu}>
                Update
              </Button>
              <Button
                sx={{ color: "#000" }}
                onClick={() => router.push("/backoffice/menu")}>
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
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        title="Delete Menu"
        content="Are you sure you want to delete this menu?"
        handleDelete={handleDeleteMenu}
      />
    </Box>
  );
};

export default MenuDetailPage;
