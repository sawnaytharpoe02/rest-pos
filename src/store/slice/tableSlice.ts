import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Table } from "@prisma/client";
import { TableSlice } from "@/types/table";
import {
  CreateTablePayload,
  UpdateTablePayload,
  DeleteTablePayload,
} from "@/types/table";
import { config } from "@/config";

const initialState: TableSlice = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload: CreateTablePayload) => {
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const table = await res.json();

      payload.onSuccess && payload.onSuccess();

      return table;
    } catch (error) {
      console.log(error);
      payload.onError && payload.onError();
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (data: UpdateTablePayload, thunkApi) => {
    const { onSuccess, onError, ...payload } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/tables`, {
        method: "PUT",
        headers: { "Content-Type": "application-content/json" },
        body: JSON.stringify(payload),
      });

      const table = await res.json();
      thunkApi.dispatch(replaceTable(table));
      onSuccess && onSuccess();
      return table;
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (data: DeleteTablePayload, thunkApi) => {
    const { onSuccess, onError, id } = data;
    try {
      const res = await fetch(`${config.backofficeApiBaseUrl}/tables?id=${id}`, {
        method: "DELETE",
      });

      const table = await res.json();
      thunkApi.dispatch(removeTable(table));

      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((table) =>
        table.id === action.payload.id ? action.payload : table
      );
    },
    removeTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.filter((table) =>
        table.id === action.payload.id ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state, _action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createTable.fulfilled,
        (state, action: PayloadAction<Table>) => {
          state.isLoading = false;
          state.error = null;
          state.tables = [...state.tables, action.payload];
        }
      )
      .addCase(createTable.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Error occured while creating table.");
        state.error = error.message;
      });
  },
});

export const { setTables, replaceTable, removeTable } = tableSlice.actions;
export default tableSlice.reducer;
