"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  Switch,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  FormControlLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import { UpdateLocationPayload } from "@/types/location";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { deleteLocation, updateLocation } from "@/store/slice/locationSlice";
import { setSelectedLocation } from "@/store/slice/appSlice";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";

const LocationDetailPage = ({ params }: { params: { id: string } }) => {
  const locationId = Number(params.id);
  const router = useRouter();
  const [updateData, setUpdateData] = useState<UpdateLocationPayload>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { locations, isLoading } = useAppSelector((state) => state.location);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const location = locations.find((item) => item.id === locationId);

  useEffect(() => {
    if (location) {
      setUpdateData(location);
    }
  }, [locations]);

  const handleUpdateLocation = () => {
    const shouldUpdate =
      updateData?.name !== location?.name ||
      updateData?.street !== location?.street ||
      updateData?.township !== location?.township ||
      updateData?.city !== location?.city;
    if (!shouldUpdate) {
      return router.push("/backoffice/location");
    }
    updateData &&
      dispatch(
        updateLocation({
          ...updateData,
          onSuccess: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Update location successfully",
                })
              );
            }, 1000);
            router.push("/backoffice/location");
          },
          onError: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "error",
                  isOpen: true,
                  message: "Error occured while updating location",
                })
              );
            }, 1000);
          },
        })
      );
  };

  if (!updateData) {
    return <Typography>Location not found</Typography>;
  }

  const handleDeleteLocation = () => {
    dispatch(
      deleteLocation({
        id: locationId,
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete location successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/location");
        },
      })
    );
  };

  return (
    <div>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Grid container sx={{ px: 4, gap: 2 }}>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  value={updateData?.name}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Street</FormLabel>
                <OutlinedInput
                  value={updateData?.street}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({ ...updateData, street: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Township</FormLabel>
                <OutlinedInput
                  value={updateData?.township}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({ ...updateData, township: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>City</FormLabel>
                <OutlinedInput
                  value={updateData?.city}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({ ...updateData, city: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={location?.id === selectedLocation?.id}
                    onChange={() => {
                      if (location) {
                        dispatch(setSelectedLocation(location));
                        localStorage.setItem(
                          "selectedLocationId",
                          JSON.stringify(location.id)
                        );
                      }
                    }}
                  />
                }
                label="Current location"
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
                onClick={handleUpdateLocation}>
                Update
              </Button>
              <Button sx={{color: '#000'}} variant="text" onClick={() => router.push('/backoffice/location')}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button color="error" variant="contained" onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
        </Grid>
      </Grid>
      <CommonDeleteDialog
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        title="Delete Location"
        content="Are you sure you want to delete this location?"
        handleDelete={handleDeleteLocation}
      />
    </div>
  );
};

export default LocationDetailPage;
