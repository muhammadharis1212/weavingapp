import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allSuppliers } from "../../api/suppliers/suppliers";

const initialState = {
  isLoading: false,
  suppliers: [],
  error: "",
};
export const fetchSuppliers = createAsyncThunk(
  "suppliers/allSuppliers",
  async (authToken) => {
    const res = await allSuppliers(authToken);
    return res?.data;
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
  },
});
export default suppliersSlice.reducer;
