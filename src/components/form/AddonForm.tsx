"use client";

import {
  Grid,
  Box,
  CircularProgress,
  FormLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { CreateAddonPayload } from "@/types/addon";
import { createAddon } from "@/store/slice/addonSlice";
import SingleSelect from "../SingleSelect";

interface Props {
  addonData: CreateAddonPayload;
  setAddonData: React.Dispatch<React.SetStateAction<CreateAddonPayload>>;
}

const AddonForm = ({ addonData, setAddonData }: Props) => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.addon);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const handleCreateAddon = () => {
    const { name, price, addonCategoryId } = addonData;

    const isValid = name && price !== undefined && addonCategoryId;
    if (!isValid) return null;

    console.log(addonData);
    isValid &&
      dispatch(
        createAddon({
          ...addonData,
          onSuccess: () => {
            dispatch(setOpenDialog(false));
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Create addon successfully",
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
                  message: "Error occured while creating addon",
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
                  setAddonData({ ...addonData, name: e.target.value })
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
                  setAddonData({ ...addonData, price: Number(e.target.value) })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <SingleSelect
              title="Addon Category"
              selected={Number(addonData.addonCategoryId)}
              setSelected={(selectedValue) =>
                setAddonData({
                  ...addonData,
                  addonCategoryId: Number(selectedValue),
                })
              }
              items={addonCategories}
            />
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
              onClick={handleCreateAddon}>
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

export default AddonForm;
