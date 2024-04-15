"use client";

import {
  Grid,
  OutlinedInput,
  FormControl,
  FormLabel,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { createAddonCategory } from "@/store/slice/addonCategorySlice";
import MultiSelect from "../MultiSelect";

interface Props {
  addonCategoryData: CreateAddonCategoryPayload;
  setAddonCategoryData: React.Dispatch<
    React.SetStateAction<CreateAddonCategoryPayload>
  >;
}

const AddonCategoryForm = ({
  addonCategoryData,
  setAddonCategoryData,
}: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.addonCategory);
  const { menus } = useAppSelector((state) => state.menu);

  const handleCreateAddonCategory = () => {
    if (!addonCategoryData.menuIds?.length) {
      dispatch(
        setSnackbar({
          type: "error",
          isOpen: true,
          message: "Please select at least one menu",
        })
      );
    }
    dispatch(
      createAddonCategory({
        ...addonCategoryData,
        onSuccess: () => {
          dispatch(setOpenDialog(false));
          dispatch(
            setSnackbar({
              type: "success",
              isOpen: true,
              message: "Create addon category successfully",
            })
          );
        },
      })
    );
  };

  return (
    <div>
      <Box>
        <Grid width={350} container sx={{ p: 4 }}>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%", mb: 2 }}>
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                type="text"
                onChange={(e) =>
                  setAddonCategoryData({
                    ...addonCategoryData,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MultiSelect
              title="Addon Category"
              selected={addonCategoryData.menuIds || []}
              setSelected={(selectedValues) =>
                setAddonCategoryData({
                  ...addonCategoryData,
                  menuIds: selectedValues,
                })
              }
              items={menus}
            />
          </Grid>
          <Grid item xs={12} sx={{ my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={true}
                  onChange={(e, value) => {
                    setAddonCategoryData({
                      ...addonCategoryData,
                      isRequired: value,
                    });
                  }}
                />
              }
              label="Require"
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
              onClick={handleCreateAddonCategory}>
              Create
            </Button>
            <Button
              onClick={() => dispatch(setOpenDialog(false))}
              sx={{ color: "#000" }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddonCategoryForm;
