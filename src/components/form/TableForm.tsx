"use client";

import {
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import { CreateTablePayload } from "@/types/table";
import { createTable } from "@/store/slice/tableSlice";

interface Props {
  tableData: CreateTablePayload;
  setTableData: React.Dispatch<React.SetStateAction<CreateTablePayload>>;
}

const TableForm = ({ tableData, setTableData }: Props) => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.table);
  const { selectedLocation } = useAppSelector((state) => state.app);

  useEffect(() => {
    setTableData({ ...tableData, locationId: selectedLocation?.id });
  }, [selectedLocation]);

  const handleCreateTable = () => {
    dispatch(
      createTable({
        ...tableData,
        onSuccess: () => {
          dispatch(setOpenDialog(false));
          setTimeout(() => {
            setSnackbar({
              type: "success",
              isOpen: true,
              message: "Create table successfully.",
            });
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
                type="text"
                onChange={(e) =>
                  setTableData({ ...tableData, name: e.target.value })
                }
              />
            </FormControl>
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
              onClick={handleCreateTable}>
              Create
            </Button>
            <Button
              sx={{ color: "#000" }}
              onClick={() => dispatch(setOpenDialog(false))}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TableForm;
