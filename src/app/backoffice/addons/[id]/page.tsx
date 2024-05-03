"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  Button,
  Typography,
} from "@mui/material";
import { UpdateAddonPayload } from "@/types/addon";
import { updateAddon, deleteAddon } from "@/store/slice/addonSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";
import SingleSelect from "@/components/SingleSelect";
import { appDataSelector } from "@/store/slice/appSlice";

const AddonDetailPage = ({ params }: { params: { id: string } }) => {
  const addonId = Number(params.id);
  const router = useRouter();

  const [updateData, setUpdateData] = useState<UpdateAddonPayload>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { addons, addonCategories } = useAppSelector(appDataSelector);
  const addon = addons.find((item) => item.id === addonId);

  useEffect(() => {
    if (addon) {
      setUpdateData({
        ...addon,
      });
    }
  }, [addon]);

  if (!updateData) {
    return <Typography>Addon not found</Typography>;
  }

  const handleUpdateAddon = () => {
    updateData &&
      dispatch(
        updateAddon({
          ...updateData,
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
            router.push("/backoffice/addons");
          },
        })
      );
  };

  const handleDeleteAddon = () => {
    dispatch(
      deleteAddon({
        id: addonId,
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete addon successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/addons");
        },
      })
    );
  };

  return (
    <div>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Grid container sx={{ p: 4, gap: 2 }}>
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
                  type="number"
                  value={updateData.price}
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
              <SingleSelect
                title="Addon Category"
                selected={updateData.addonCategoryId}
                setSelected={(selectedValue) =>
                  setUpdateData({
                    ...updateData,
                    addonCategoryId: selectedValue,
                  })
                }
                items={addonCategories}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained" onClick={handleUpdateAddon}>
                Update
              </Button>
              <Button
                sx={{ color: "#000" }}
                variant="text"
                onClick={() => router.push("/backoffice/addons")}>
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
        title="Delete Addon"
        content="Are you sure you want to delete this addon?"
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        handleDelete={handleDeleteAddon}
      />
    </div>
  );
};

export default AddonDetailPage;
