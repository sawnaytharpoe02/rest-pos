"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuCategoryForm from "@/components/form/MenuCategoryForm";
import { MenuCategory } from "@/types/menuCategory";

const page = () => {
  const [menuCategoryData, setMenuCategoryData] = useState<MenuCategory>({
    name: "",
    isAvailable: true,
  });

  const dispatch = useAppDispatch();
  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
  };

  return (
    <>
      <Typography> This is the Menu Category Page</Typography>
      <Button onClick={handleOpenDialog} variant="contained">
        Create New Menu Category
      </Button>
      <CommonDialog formTitle="Create Menu Category Form">
        <MenuCategoryForm
          menuCategoryData={menuCategoryData}
          setMenuCategoryData={setMenuCategoryData}
        />
      </CommonDialog>
    </>
  );
};

export default page;
