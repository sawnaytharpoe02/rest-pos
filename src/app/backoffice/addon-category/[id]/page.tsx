"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Checkbox,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { UpdateAddonCategoryPayload } from "@/types/addonCategory";
import {
  updateAddonCategory,
  deleteAddonCategory,
} from "@/store/slice/addonCategorySlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";
import MultiSelect from "@/components/MultiSelect";
import { Menu } from "@prisma/client";
import { appDataSelector } from "@/store/slice/appSlice";

const AddonCategoryDetailPage = ({ params }: { params: { id: string } }) => {
  const addonCategoryId = Number(params.id);
  const router = useRouter();

  const [updateData, setUpdateData] = useState<UpdateAddonCategoryPayload>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const { menus, addonCategories, menuAddonCategories } =
    useAppSelector(appDataSelector);

  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );

  const selectedMenuIds = menuAddonCategories
    .filter((item) => item.addonCategoryId === addonCategoryId)
    .map((item) => {
      const menu = menus.find((menu) => menu.id === item.menuId) as Menu;
      return menu.id;
    });

  useEffect(() => {
    if (addonCategory) {
      setUpdateData({
        ...addonCategory,
      });
      selectedMenuIds.length > 0 && setSelectedIds(selectedMenuIds);
    }
  }, [addonCategory]);

  if (!updateData) {
    return <Typography>Addon not found</Typography>;
  }

  const handleUpdateAddonCategory = () => {
    if (!selectedIds.length) {
      dispatch(
        setSnackbar({
          type: "error",
          isOpen: true,
          message: "Please select at least one menu",
        })
      );
      return;
    }

    const payload = {
      ...updateData,
      menuIds: selectedIds,
    };

    dispatch(
      updateAddonCategory({
        ...payload,
        onSuccess: () => {
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Update addon successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/addon-category");
        },
      })
    );
  };

  if (!updateData) {
    return <Typography>Addon category not found</Typography>;
  }

  const handleDeleteAddonCategory = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryId,
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete addon category successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/addon-category");
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
              <FormControl sx={{ width: "100%", mb: 2 }}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  type="text"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MultiSelect
                title="Menus"
                selected={selectedIds}
                setSelected={(selectedValues: number[]) =>
                  setSelectedIds(selectedValues)
                }
                items={menus}
              />
            </Grid>
            <Grid item xs={12} sx={{ my: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={updateData.isRequired}
                    onChange={(e, value) => {
                      setUpdateData({
                        ...updateData,
                        isRequired: value,
                      });
                    }}
                  />
                }
                label="Require"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained" onClick={handleUpdateAddonCategory}>
                Update
              </Button>
              <Button
                sx={{ color: "#000" }}
                variant="text"
                onClick={() => router.push("/backoffice/addon-category")}>
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
        title="Delete Addon Category"
        content="Are you sure you want to delete this addon category?"
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        handleDelete={handleDeleteAddonCategory}
      />
    </div>
  );
};

export default AddonCategoryDetailPage;
