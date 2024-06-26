"use client";

import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenDialog } from "@/store/slice/appDialogSlice";
import CommonDialog from "@/components/dialog/CommonDialog";
import { CreateTablePayload } from "@/types/table";
import TableForm from "@/components/form/TableForm";
import TableCard from "./_components/TableCard";
import { appDataSelector } from "@/store/slice/appSlice";

const TablePage = () => {
  const [tableData, setTableData] = useState<CreateTablePayload>({
    name: "",
    assetUrl: "",
    locationId: undefined,
  });

  const dispatch = useAppDispatch();
  const { tables, selectedLocation } = useAppSelector(appDataSelector);

  const currentTables = tables.filter(
    (table) => table.locationId === selectedLocation?.id
  );

  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
  };

  const handlePrintQRCode = (assetUrl: string) => {
    const openWindow = window.open("", "_blank");
    openWindow?.document.write(
      `<head>
        <title>Print QR Code</title>
      </head>
      <body style="text-align: center;">
        <img src="${assetUrl}" style="width: "400px"; height: "400px" onload="window.print();window.close()"/>
      </body>
      </html>`
    );
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
          <Typography> Table Lists </Typography>{" "}
          <Button onClick={handleOpenDialog} variant="contained">
            New Table
          </Button>
        </Box>

        <Grid container spacing={2} mt={4}>
          {currentTables?.map((item) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={item.id}
              sx={{ textAlign: "center" }}>
              <TableCard
                name={item.name}
                imageUrl={item.assetUrl}
                href={`/backoffice/tables/${item.id}`}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => handlePrintQRCode(item.assetUrl)}>
                Print QR code
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <CommonDialog formTitle="Create Location Form">
        <TableForm tableData={tableData} setTableData={setTableData} />
      </CommonDialog>
    </>
  );
};

export default TablePage;
