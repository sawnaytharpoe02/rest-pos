"use client";

import {
  Grid,
  Box,
  CircularProgress,
  FormLabel,
  Button,
  Chip,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu } from "@/store/slice/menuSlice";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { CreateMenuPayload } from "@/types/menu";
import MultiSelect from "../MultiSelect";
import FileDropZone from "@/components/FileDropZone";
import { useState } from "react";
import { uploadAssset } from "@/store/slice/appSlice";

interface Props {
  menuData: CreateMenuPayload;
  setMenuData: React.Dispatch<React.SetStateAction<CreateMenuPayload>>;
}

const MenuForm = ({ setMenuData, menuData }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menu);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const [menuImage, setMenuImage] = useState<File>();

  const handleCreateMenu = () => {
    const { name, price, description, menuCategoryIds } = menuData;

    const isValid = name && price && description && menuCategoryIds.length > 0;
    if (!isValid) return null;

    if (menuImage) {
      dispatch(
        uploadAssset({
          file: menuImage,
          onSuccess: (assetUrl) => {
            menuData.assetUrl = assetUrl;
            console.log(menuData);
            dispatch(
              createMenu({
                ...menuData,
                onSuccess: () => {
                  dispatch(setOpenDialog(false));
                  setTimeout(() => {
                    dispatch(
                      setSnackbar({
                        type: "success",
                        isOpen: true,
                        message: "Create menu successfully",
                      })
                    );
                  }, 1000);
                },
              })
            );
          },
        })
      );
    }
  };

  return (
    <div>
      <Box>
        <Grid width={350} container sx={{ px: 4, gap: 2 }}>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                onChange={(e) =>
                  setMenuData({ ...menuData, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Price</FormLabel>
              <OutlinedInput
                type="number"
                onChange={(e) =>
                  setMenuData({ ...menuData, price: Number(e.target.value) })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Description</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setMenuData({
                    ...menuData,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MultiSelect
              title="Menu Category"
              selected={menuData.menuCategoryIds}
              setSelected={(selectedValues: number[]) =>
                setMenuData({ ...menuData, menuCategoryIds: selectedValues })
              }
              items={menuCategories}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Image</FormLabel>
            <FileDropZone
              onDrop={(acceptedFiles) => setMenuImage(acceptedFiles[0])}
            />
            {menuImage && (
              <Chip
                sx={{ mt: 2 }}
                label={menuImage.name}
                onDelete={() => setMenuImage(undefined)}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              startIcon={
                isLoading && <CircularProgress color="inherit" size={20} />
              }
              variant="contained"
              onClick={handleCreateMenu}>
              Create
            </Button>
            <Button
              sx={{ color: "#000" }}
              variant="text"
              onClick={() => dispatch(setOpenDialog(false))}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MenuForm;
