import { createSlice } from "@reduxjs/toolkit";

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState: [],
  reducers: {
    addVendors: (state, { payload }) => {
      state.vendors = payload;
    },
  },
});
export const { addVendors } = vendorsSlice.actions;
export const getAllVendors = (state) => state.vendors.vendors;
export default vendorsSlice.reducer;
