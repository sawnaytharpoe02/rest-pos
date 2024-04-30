import React from "react";
import { Box, Typography } from "@mui/material";

const OrderAppFooter = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        mt: "auto",
        textAlign: "center",
        padding: "10px",
        background: "#00A76F",
      }}>
      <Typography sx={{ color: "#fff" }}>
        @2024 Food Ordering System. All right reserved.
      </Typography>
    </Box>
  );
};

export default OrderAppFooter;
