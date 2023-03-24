import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSupplier } from "../../api/suppliers/getSupplier";
import { searchSuppliers } from "../../api/suppliers/searchSuppliers";
import { allSuppliers } from "../../api/suppliers/suppliers";

const initialState = {
  isLoading: false,
  suppliers: [],
  error: "",
};
export const fetchSuppliers = createAsyncThunk(
  "suppliers/allSuppliers",
  async (data) => {
    const { authToken, searchParams } = data;
    if (searchParams) {
      const res = await searchSuppliers(authToken, searchParams);
      return res?.data;
    } else {
      const res = await allSuppliers(authToken);
      return res?.data;
    }
  }
);
export const fetchSupplierById = createAsyncThunk(
  "suppliers/byID",
  async (data) => {
    const { authToken, id } = data;
    try {
      const res = await getSupplier(authToken, id);
      return res.data;
    } catch (error) {
      return error.res;
    }
  }
);

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSuppliers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.suppliers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSuppliers.rejected, (state, action) => {
      state.isLoading = false;
      state.suppliers = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchSupplierById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSupplierById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.suppliers = [action.payload];
      state.error = "";
    });
    builder.addCase(fetchSupplierById.rejected, (state, action) => {
      state.isLoading = false;
      state.suppliers = [];
      state.error = action.error.message;
    });
  },
});
export default suppliersSlice.reducer;
