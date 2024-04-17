"use client";

import { Typography, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CommonCard from "@/components/card/CommonCard";

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const { company, isLoading } = useAppSelector((state) => state.company);

  if (!company) {
    return <Typography>Company not found.</Typography>;
  }
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography> Company List </Typography>{" "}
        </Box>

        <Grid container spacing={2} mt={4}>
          {isLoading ? (
            <Typography>Loading ...</Typography>
          ) : (
            <Grid item xs={6} sm={4} md={3} lg={2} key={company.id}>
              <CommonCard
                name={company.name}
                street={company.street}
                href={`/backoffice/settings/${company.id}`}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default CompanyPage;
