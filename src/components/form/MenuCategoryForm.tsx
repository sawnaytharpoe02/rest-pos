"use client";

import {
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { createMenuCategory } from "@/store/slice/menuCategorySlice";

interface Props {
  menuCategoryData: CreateMenuCategoryPayload;
  setMenuCategoryData: React.Dispatch<
    React.SetStateAction<CreateMenuCategoryPayload>
  >;
}

const MenuCategoryForm = ({ setMenuCategoryData, menuCategoryData }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menuCategory);
  const { company } = useAppSelector((state) => state.company);
  menuCategoryData.companyId = company?.id;

  const handleCreateMenuCategory = () => {
    const isValid =
      menuCategoryData.name &&
      menuCategoryData.companyId &&
      menuCategoryData.isAvailable;
    isValid &&
      dispatch(
        createMenuCategory({
          ...menuCategoryData,
          onSuccess: () => {
            dispatch(setOpenDialog(false));
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Create menu category successfully",
                })
              );
            }, 1000);
          },
          onError: () => {
            dispatch(setOpenDialog(false));
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "error",
                  isOpen: true,
                  message: "Error occured while creating menu category",
                })
              );
            }, 1000);
          },
        })
      );
  };

  return (
    <div>
      <Box>
        <Grid width={350} container sx={{ p: 4 }}>
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              onChange={(e) =>
                setMenuCategoryData({
                  ...menuCategoryData,
                  name: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={menuCategoryData.isAvailable}
                  onChange={(e) =>
                    setMenuCategoryData({
                      ...menuCategoryData,
                      isAvailable: e.target.checked,
                    })
                  }
                />
              }
              label="Available"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              startIcon={
                isLoading && <CircularProgress color="inherit" size={20} />
              }
              variant="contained"
              onClick={handleCreateMenuCategory}>
              Create
            </Button>
            <Button
              onClick={() => dispatch(setOpenDialog(false))}
              variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MenuCategoryForm;
