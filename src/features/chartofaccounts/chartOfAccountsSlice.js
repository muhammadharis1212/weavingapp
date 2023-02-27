import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../../api/chartofaccounts/getAccounts";
import { postAccount } from "../../api/chartofaccounts/postAccount";

const initialState = {
  isLoading: false,
  chartOfAccounts: [],
  error: "",
};
export const fetchChartAccounts = createAsyncThunk(
  "chartofaccounts/getChartAccounts",
  async (authToken) => {
    const res = await getAccounts(authToken);
    return res.data;
  }
);
export const createChartAccount = createAsyncThunk(
  "chartofaccounts/createChartAccounts",
  async (authToken, account) => {
    const res = await postAccount(authToken, account);
    return res.data;
  }
);
export const chartOfAccountsSlice = createSlice({
  name: "chartofaccounts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChartAccounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChartAccounts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartOfAccounts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchChartAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.chartOfAccounts = [];
      state.error = action.error.message;
    });
  },
});
export default chartOfAccountsSlice.reducer;
