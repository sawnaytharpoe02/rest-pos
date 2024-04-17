"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { updateCompany } from "@/store/slice/companySlice";
import { UpdateCompanyPayload } from "@/types/company";

const CompanyDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [updateData, setUpdateData] = useState<UpdateCompanyPayload>();

  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (company) {
      setUpdateData(company);
    }
  }, [company]);

  const handleUpdateCompany = () => {
    const shouldUpdate =
      updateData?.name !== company?.name ||
      updateData?.street !== company?.street ||
      updateData?.township !== company?.township ||
      updateData?.city !== company?.city;
    if (!shouldUpdate) {
      return router.push("/backoffice/company");
    }
    updateData &&
      dispatch(
        updateCompany({
          ...updateData,
          onSuccess: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Update company successfully",
                })
              );
            }, 1000);
            router.push("/backoffice/settings");
          },
          onError: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "error",
                  isOpen: true,
                  message: "Error occured while updating company",
                })
              );
            }, 1000);
          },
        })
      );
  };

  if (!updateData) {
    return <Typography>Company not found</Typography>;
  }

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
            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained" onClick={handleUpdateCompany}>
                Update
              </Button>
              <Button
                sx={{ color: "#000" }}
                variant="text"
                onClick={() => router.push("/backoffice/settings")}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyDetailPage;
