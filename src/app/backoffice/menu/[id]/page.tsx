"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormLabel,
  Select,
  OutlinedInput,
  CircularProgress,
  Checkbox,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { UpdateMenuPayload } from "@/types/menu";
import FormButton from "@/components/button/FormButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { updateMenu } from "@/store/slice/menuSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";

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
  const paramsId = Number(params.id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { menus, isLoading } = useAppSelector((state) => state.menu);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );

  const [updateData, setUpdateData] = useState<UpdateMenuPayload>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const menu = menus.find((item) => item.id === paramsId);
  const selectedMenuCategoryIds = menuCategoryMenus
    ?.filter((item) => item.menuId === menu?.id)
    .map((item) => item.menuCategoryId);

  useEffect(() => {
    if (menu) {
      setUpdateData(menu);
      setSelectedIds(selectedMenuCategoryIds);
    }
  }, [menu]);

  if (!updateData) {
    return <Typography>Menu not found</Typography>;
  }

  
  const handleUpdateMenu = async () => {
    const shouldUpdate =
      menu?.name !== updateData?.name ||
      menu?.price !== updateData?.price ||
      menu?.description !== updateData?.description ||
      selectedIds.length !== selectedMenuCategoryIds.length ||
      selectedIds.every(
        (item, index) => item !== selectedMenuCategoryIds[index]
      );

    if (!shouldUpdate) {
      return router.push("/backoffice/menu");
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
                message: "Update menu category successfully",
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
                setUpdateData({ ...updateData, price: Number(e.target.value) })
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
          <FormControl size="small" sx={{ width: "100%" }}>
            <FormLabel>Menu Category</FormLabel>
            <Select
              value={selectedIds}
              multiple
              onChange={(e) => {
                const selectedValues = e.target.value as number[];
                setSelectedIds(selectedValues);
              }}
              renderValue={(selected: number[]) => {
                return menuCategories
                  .filter((item) => selected.includes(item.id))
                  .map((item) => item.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}>
              {menuCategories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={selectedIds.includes(item.id)} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <FormButton
            startIcon={
              isLoading && <CircularProgress color="inherit" size={20} />
            }
            variant="contained"
            onClick={handleUpdateMenu}>
            Update
          </FormButton>
          <FormButton onClick={() => dispatch(setOpenDialog(false))}>
            Cancel
          </FormButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuDetailPage;
