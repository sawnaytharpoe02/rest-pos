"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { Menu } from "@/types/menu";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuForm from "@/components/form/MenuForm";

const page = () => {
  const [menuData, setMenuData] = useState<Menu>({
    name: "",
    price: 0,
  });

  const dispatch = useAppDispatch();
  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
  };

  return (
    <>
      <Typography> This is the Menu Page</Typography>
      <Button onClick={handleOpenDialog} variant="contained">
        Create New Menu
      </Button>
      <CommonDialog formTitle="Create Menu Form">
        <MenuForm menuData={menuData} setMenuData={setMenuData} />
      </CommonDialog>
    </>
  );
};

export default page;
