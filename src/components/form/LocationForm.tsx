"use client";

import {
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import FormButton from "@/components/button/FormButton";
import { CreateLocationPayload } from "@/types/location";
import { createLocation } from "@/store/slice/locationSlice";
import {useRouter} from "next/navigation";

interface Props {
  locationData: CreateLocationPayload;
  setLocationData: React.Dispatch<React.SetStateAction<CreateLocationPayload>>;
}

const LocationForm = ({ locationData, setLocationData }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menuCategory);
  const { company } = useAppSelector((state) => state.company);

  const handleCreateLocation = () => {
    setLocationData((prev) => ({ ...prev, companyId: company?.id }));
    const isValid =
      locationData.name &&
      locationData.street &&       
      locationData.township &&
      locationData.city &&
      locationData.companyId;

    if (!isValid) return router.push('/backoffice/location')

    locationData && dispatch(
      createLocation({
        ...locationData,
        onSuccess: () => {
          dispatch(setOpenDialog(false));
          setTimeout(() => {
            setSnackbar({
              type: "success",
              isOpen: true,
              message: "Create location successfully.",
            });
          }, 1000);
        },
        onError: () => {
          dispatch(setOpenDialog(false));
          setTimeout(() => {
            setSnackbar({
              type: "error",
              isOpen: true,
              message: "Error occured while creating location.",
            });
          }, 1000);
        },
      })
    );
  };

  return (
    <div>
      <Box>
        <Grid width={350} container sx={{ px: 4, gap: 2 }}>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setLocationData({ ...locationData, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Street</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setLocationData({ ...locationData, street: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Township</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setLocationData({ ...locationData, township: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>City</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setLocationData({ ...locationData, city: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <FormButton
              startIcon={
                isLoading && <CircularProgress color="inherit" size={20} />
              }
              variant="contained"
              onClick={handleCreateLocation}>
              Create
            </FormButton>
            <FormButton
              onClick={() => dispatch(setOpenDialog(false))}
              variant="outlined">
              Cancel
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LocationForm;
