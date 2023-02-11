import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../../api/chartofaccounts/getAccounts";
import { postAccount } from "../../api/chartofaccounts/postAccount";

const initialState = {
  isLoading: false,
  chartOfAccounts: [],
  error: "",
};
export const getChartAccounts = createAsyncThunk(
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
    builder.addCase(getChartAccounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChartAccounts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartOfAccounts = action.payload;
      state.error = "";
    });
    builder.addCase(getChartAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.chartOfAccounts = [];
      state.error = action.error.message;
    });
  },
});
export default chartOfAccountsSlice.reducer;
