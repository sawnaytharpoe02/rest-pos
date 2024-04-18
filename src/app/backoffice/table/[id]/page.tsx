"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Grid,
  Switch,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  FormControlLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import { setSnackbar } from "@/store/slice/appSnackbarSlice";
import CommonDeleteDialog from "@/components/dialog/CommonDeleteDialog";
import { UpdateTablePayload, DeleteTablePayload } from "@/types/table";
import { updateTable, deleteTable } from "@/store/slice/tableSlice";

const TableDetailPage = ({ params }: { params: { id: string } }) => {
  const tableId = Number(params.id);
  const router = useRouter();
  const [updateData, setUpdateData] = useState<UpdateTablePayload>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((state) => state.table);
  const table = tables.find((table) => table.id === tableId);

  useEffect(() => {
    setUpdateData(table);
  }, []);

  const handleUpdateTable = () => {
    updateData &&
      dispatch(
        updateTable({
          ...updateData,
          onSuccess: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "success",
                  isOpen: true,
                  message: "Update table successfully",
                })
              );
            }, 1000);
            router.push("/backoffice/table");
          },
          onError: () => {
            setTimeout(() => {
              dispatch(
                setSnackbar({
                  type: "error",
                  isOpen: true,
                  message: "Error occured while updating table",
                })
              );
            }, 1000);
          },
        })
      );
  };

  if (!updateData) {
    return <Typography>Table not found</Typography>;
  }

  const handleDeleteTable = () => {
    dispatch(
      deleteTable({
        id: tableId,
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setTimeout(() => {
            dispatch(
              setSnackbar({
                type: "success",
                isOpen: true,
                message: "Delete table successfully",
              })
            );
          }, 1000);
          router.push("/backoffice/table");
        },
      })
    );
  };

  return (
    <div>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Grid container sx={{ px: 4, gap: 2 }}>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  value={updateData?.name}
                  type="text"
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained" onClick={handleUpdateTable}>
                Update
              </Button>
              <Button
                sx={{ color: "#000" }}
                variant="text"
                onClick={() => router.push("/backoffice/table")}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpenDeleteDialog(true)}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <CommonDeleteDialog
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
        title="Delete Location"
        content="Are you sure you want to delete this location?"
        handleDelete={handleDeleteTable}
      />
    </div>
  );
};

export default TableDetailPage;
