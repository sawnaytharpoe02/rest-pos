"use client";

import React, { useState, useEffect } from "react";
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
import { updateLocation } from "@/store/slice/locationSlice";
import { setSelectedLocation } from "@/store/slice/appSlice";
import { Location } from "@prisma/client";

const LocationDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [updateData, setUpdateData] = useState<UpdateLocationPayload>();

  const dispatch = useAppDispatch();
  const { locations, isLoading } = useAppSelector((state) => state.location);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const location = locations.find((item) => item.id === Number(params.id));

  useEffect(() => {
    if (location) {
      setUpdateData(location);
    }
  }, [location]);

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

  return (
    <div>
      <Grid width={350} container sx={{ px: 4, gap: 2 }}>
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
                onChange={(value) => {
                  setSelectedLocation(location as Location);
                  localStorage.setItem(
                    "selectedLocation",
                    JSON.stringify(location)
                  );
                }}
              />
            }
            label="current location"
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
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationDetailPage;
