import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllUnits } from "../../../api/items/unit/getAllUnits";
import { CREATE_ITEM_UNIT } from "../../../constants/base-url";

const initialState = {
  isLoading: false,
  units: [],
  error: "",
};
export const getUnits = createAsyncThunk(
  "itemUnits/getUnits",
  async (authToken) => {
    const res = await getAllUnits(authToken);
    return res.data;
  }
);
export const postUnit = createAsyncThunk("itemUnits/postUnit", async (data) => {
  try {
    const res = await axios.post(CREATE_ITEM_UNIT, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
});
export const itemUnitsSlice = createSlice({
  name: "itemUnits",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUnits.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUnits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.units = action.payload;
      state.error = "";
    });
    builder.addCase(getUnits.rejected, (state, action) => {
      state.isLoading = false;
      state.units = [];
      state.error = action.error.message;
    });
    builder.addCase(postUnit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUnit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.units.push(action.payload);
      state.error = "";
    });
    builder.addCase(postUnit, (state, action) => {
      state.isLoading = false;
      state.units = [];
      state.error = action.error.message;
    });
  },
});

export default itemUnitsSlice.reducer;
