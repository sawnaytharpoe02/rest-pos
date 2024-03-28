"use client";

import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import MenuCategoryForm from "@/components/form/MenuCategoryForm";
import MenuCategoryCard from "@/components/card/MenuCategoryCard";
import { config } from "@/config";
import { CreateUpdateMenuCategory } from "@/types/menuCategory";

const MenuCategoryPage = () => {
  const [menuCategoryData, setMenuCategoryData] = useState<CreateUpdateMenuCategory>({
    name: "",
    isAvailable: true,
  });
  const { menuCategories } = useAppSelector((state) => state.menuCategory);

  const dispatch = useAppDispatch();
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
          <Typography> Menu Category Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            Create New Menu Category
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          {menuCategories?.map((item) => (
            <MenuCategoryCard
              key={item.id}
              title={item.name}
              subTitle="description"
              icon={<Icon icon="mingcute:fork-spoon-fill" />}
              href={`${config.backofficeBaseUrl}/menu-category/${item.id}`}
            />
          ))}
        </Box>
      </Box>
      <CommonDialog formTitle="Create Menu Category Form">
        <MenuCategoryForm
          menuCategoryData={menuCategoryData}
          setMenuCategoryData={setMenuCategoryData}
        />
      </CommonDialog>
    </>
  );
};

export default MenuCategoryPage;
