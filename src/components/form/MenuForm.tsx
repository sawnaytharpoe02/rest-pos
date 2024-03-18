"use client";

import { Grid, TextField, Button, Box, CircularProgress } from "@mui/material";
import { Menu } from "../../types/menu";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu } from "@/store/slice/menuSlice";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";

interface Props {
  menuData: Menu;
  setMenuData: React.Dispatch<React.SetStateAction<Menu>>;
}

const MenuForm = ({ setMenuData, menuData }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menu);

  const handleCreateMenu = () => {
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
        onError: () => {
          dispatch(setOpenDialog(false));
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "error",
                isOpen: true,
                message: "Error occured while creating menu",
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
        <Grid width={350} container sx={{ p: 4, textAlign: "center" }}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              onChange={(e) =>
                setMenuData({ ...menuData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ my: 2 }}>
            <TextField
              label="Price"
              type="number"
              onChange={(e) =>
                setMenuData({ ...menuData, price: Number(e.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              startIcon={
                isLoading && <CircularProgress color="inherit" size={20} />
              }
              variant="contained"
              onClick={handleCreateMenu}>
              Create Menu
            </Button>
            <Button onClick={() => dispatch(setOpenDialog(false))}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MenuForm;
