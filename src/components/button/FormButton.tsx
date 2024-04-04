import { Button } from "@mui/material";
import React from "react";

const FormButton = ({ children, ...props }: any) => {
  return (
    <Button
      variant={children === "Cancel" ? "outlined" : "contained"}
      color={children === "Delete" ? `error` : `primary`}
      sx={{
        color: children === "Cancel" && "#161C24",
      }}
      {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
