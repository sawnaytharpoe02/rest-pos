"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { signIn as nextAuthSignIn } from "next-auth/react";


const signIn = () => {
  return (
    <div>
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Button
          onClick={() =>
            nextAuthSignIn("google", { callbackUrl: "/backoffice/orders" })
          }
          variant="contained">  
          Sign In With Google
        </Button>
      </Box>
    </div>
  );
};

export default signIn;
