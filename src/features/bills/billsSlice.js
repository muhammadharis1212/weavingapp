import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBills } from "../../api/bills/getAllBills";
import { getBill } from "../../api/bills/getBill";
import { postNewBill } from "../../api/bills/postNewBill";
import { updateBill } from "../../api/bills/updateBill";
import { fetchSupplierById } from "../suppliers/suppliersSlice";

const initialState = {
  isLoading: false,
  bills: [],
  error: "",
  page_context: {},
};
export const allBills = createAsyncThunk(
  "bills/all",
  async (data, { rejectWithValue }) => {
    const { authToken, filter_by, per_page, page, sort_column, sort_order } =
      data;
    try {
      const res = await getAllBills(
        authToken,
        filter_by,
        per_page,
        page,
        sort_column,
        sort_order
      );
      return res.data;
    } catch (error) {
      console.log("Error : ", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const newBill = createAsyncThunk("bills/new", async (data) => {
  const { authToken, bill } = data;
  const res = await postNewBill(authToken, bill);
  return res.data;
});
export const fetchBillById = createAsyncThunk(
  "bills/id",
  async (data, { dispatch }) => {
    const { authToken, id } = data;
    const res = await getBill(authToken, id);
    console.log("ID : ", res.data.supplierId);
    //dispatch(fetchSupplierById({ authToken, id: res.data.supplierId }));
    return res.data;
  }
);
export const editBillById = createAsyncThunk(
  "bills/editBill",
  async (data, { rejectWithValue }) => {
    const { authToken, id, bill } = data;
    try {
      const res = await updateBill(authToken, id, bill);
      return res.data;
    } catch (err) {
      console.log("Error : ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    billReducer(state, action) {
      state.bills = [action.payload];
    },
  },
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
      state.error = action.payload;
    });

    builder.addCase(newBill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newBill.fulfilled, (state, action) => {
      state.isLoading = false;

      state.error = "";
    });
    builder.addCase(newBill.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoading = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchBillById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBillById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = [action.payload];
      state.error = "";
    });
    builder.addCase(fetchBillById.rejected, (state, action) => {
      state.isLoading = false;
      state.bills = [];
      state.error = action.error.message;
    });
    //edit bill
    builder.addCase(editBillById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editBillById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = [action.payload];
      state.error = "";
    });
    builder.addCase(editBillById.rejected, (state, action) => {
      state.isLoading = false;
      state.bills = [];
      state.error = action.payload;
    });
  },
});
export const { billReducer } = billsSlice.actions;
export default billsSlice.reducer;
