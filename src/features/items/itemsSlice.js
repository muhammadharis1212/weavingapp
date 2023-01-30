import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllItems } from "../../api/items/getAllItems";

const initialState = {
  isLoading: false,
  items: [],
  error: "",
};

export const fetchItems = createAsyncThunk(
  "items/getItems",
  async (authToken) => {
    const res = await getAllItems(authToken);
    return res.data;
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export default itemsSlice.reducer;
