import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBills } from "../../api/bills/getAllBills";
import { getBill } from "../../api/bills/getBill";
import { postNewBill } from "../../api/bills/postNewBill";

const initialState = {
  isLoading: false,
  bills: [],
  error: "",
  page_context: {},
};
export const allBills = createAsyncThunk("bills/all", async (data) => {
  const { authToken, filterBy, perPage, page } = data;
  const res = await getAllBills(authToken, filterBy, perPage, page);
  return res.data;
});
export const newBill = createAsyncThunk("bills/new", async (data) => {
  const { authToken, bill } = data;
  const res = await postNewBill(authToken, bill);
  return res.data;
});
export const billById = createAsyncThunk("bills/id", async (data) => {
  const { authToken, id } = data;
  console.log(data);
  const res = await getBill(authToken, id);
  return res.data;
});
export const billsSlice = createSlice({
  name: "bills",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allBills.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allBills.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = action.payload.bills;
      state.error = "";
      state.page_context = action.payload.page_context;
    });
    builder.addCase(allBills.rejected, (state, action) => {
      state.isLoading = false;
      state.bills = [];
      state.page_context = {};
      state.error = action.error.message;
    });

    builder.addCase(newBill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = [action.payload];
      state.error = "";
    });
    builder.addCase(newBill.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoading = [];
      state.error = action.error.message;
    });
    builder.addCase(billById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(billById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = [action.payload];
      state.error = "";
    });
    builder.addCase(billById.rejected, (state, action) => {
      state.isLoading = false;
      state.bills = [];
      state.error = action.error.message;
    });
  },
});
export default billsSlice.reducer;
