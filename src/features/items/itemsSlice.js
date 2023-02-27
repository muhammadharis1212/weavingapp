import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { editItem } from "../../api/items/editItem";
import { getAllItems } from "../../api/items/getAllItems";
import { getItemById } from "../../api/items/getItemById";
import { postItem } from "../../api/items/postItem";

const initialState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (authToken) => {
    const res = await getAllItems(authToken);
    return res.data;
  }
);
export const newItem = createAsyncThunk("items/newItem", async (data) => {
  console.log(data);
  const { authToken, item } = data;
  const res = await postItem(authToken, item);
  return res.data;
});
export const fetchItemById = createAsyncThunk("items/itemId", async (data) => {
  const { authToken, itemId } = data;
  const res = await getItemById(authToken, itemId);
  return res.data;
});
export const editItemById = createAsyncThunk(
  "items/editItem",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const { authToken, itemId, reqObject } = data;
    try {
      const res = await editItem(authToken, itemId, reqObject);
      return res.data;
    } catch (error) {
      console.log("In Error ");
      return rejectWithValue(error.response.data);
    }
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
      state.error = null;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.error = action.error.message;
    });
    builder.addCase(newItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [action.payload];
      state.error = null;
    });
    builder.addCase(newItem.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchItemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItemById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [action.payload];
      state.error = null;
    });
    builder.addCase(fetchItemById.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.error = action.error.message;
    });
    builder.addCase(editItemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editItemById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [action.payload];
      state.error = null;
    });
    builder.addCase(editItemById.rejected, (state, action) => {
      console.log("In rejected : ", action);
      state.isLoading = false;
      state.items = [];
      state.error = action.payload;
    });
  },
});

export default itemsSlice.reducer;
