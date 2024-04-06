"use client";

import { Grid, Box, CircularProgress, FormLabel, Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu } from "@/store/slice/menuSlice";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { CreateMenuPayload } from "@/types/menu";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = -100;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  menuData: CreateMenuPayload;
  setMenuData: React.Dispatch<React.SetStateAction<CreateMenuPayload>>;
}

const MenuForm = ({ setMenuData, menuData }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menu);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);

  const handleCreateMenu = () => {
    const { name, price, description, menuCategoryIds } = menuData;

    const isValid = name && price && description && menuCategoryIds.length > 0;
    if (!isValid) return null;

    isValid &&
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
            <FormControl size="small" sx={{ width: "100%" }}>
              <FormLabel>Menu Category</FormLabel>
              <Select
                value={menuData.menuCategoryIds}
                multiple
                onChange={(e) => {
                  const selectedValues = e.target.value as number[];
                  setMenuData({ ...menuData, menuCategoryIds: selectedValues });
                }}
                renderValue={(selected: number[]) => {
                  return menuCategories
                    .filter((item) => selected.includes(item.id))
                    .map((item) => item.name)
                    .join(", ");
                }}
                MenuProps={MenuProps}>
                {menuCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox
                      checked={menuData.menuCategoryIds.includes(item.id)}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
