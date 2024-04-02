"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import LocationForm from "@/components/form/LocationForm";
import { CreateLocationPayload } from "@/types/location";
import LocationCard from "./_components/LocationCard";

const LocationPage = () => {
  const [locationData, setLocationData] = useState<CreateLocationPayload>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: undefined,
  });

  const dispatch = useAppDispatch();
  const { locations, isLoading } = useAppSelector((state) => state.location);
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
          <Typography> Location Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Location
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : (
            locations?.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                <LocationCard
                  name={item.name}
                  street={item.street}
                  href={`/backoffice/location/${item.id}`}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <CommonDialog formTitle="Create Menu Form">
        <LocationForm
          locationData={locationData}
          setLocationData={setLocationData}
        />
      </CommonDialog>
    </>
  );
};

export default LocationPage;
