import { createSlice } from "@reduxjs/toolkit";

export const itemUnitsSlice = createSlice({
  name: "itemUnits",
  initialState: [],
  reducers: {
    addItemUnits: (state, { payload }) => {
      state.itemUnits = payload;
    },
  },
});
export const { addItemUnits } = itemUnitsSlice.actions;
export const getAllVendors = (state) => state.vendors.vendors;
export default itemUnitsSlice.reducer;
