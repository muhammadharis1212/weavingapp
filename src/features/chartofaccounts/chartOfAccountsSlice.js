import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  chartofaccounts: [],
  error: "",
};
export const chartOfAccountsSlice = createSlice({
  name: "chartofaccounts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});
