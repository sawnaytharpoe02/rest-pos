"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import { CreateAddonPayload } from "@/types/addon";
import { config } from "@/config";
import AddonForm from "@/components/form/AddonForm";
import CommonAddonCard from "@/components/card/CommonAddonCard";

const AddonPage = () => {
  const [addonData, setAddonData] = useState<CreateAddonPayload>({
    name: "",
    price: 0,
    addonCategoryId: undefined,
  });

  const dispatch = useAppDispatch();
  const { isLoading, addons } = useAppSelector((state) => state.addon);

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
          <Typography> Addon Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Addon
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : (
            addons.map((item) => {
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                  <CommonAddonCard
                    title={item.name}
                    icon={<Icon icon="solar:waterdrop-bold-duotone" />}
                    href={`${config.backofficeBaseUrl}/addon/${item.id}`}
                    isRequired={null}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
      <CommonDialog formTitle="Create Addon Form">
        <AddonForm addonData={addonData} setAddonData={setAddonData} />
      </CommonDialog>
    </>
  );
};

export default AddonPage;
