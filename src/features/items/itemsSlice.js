import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editItem } from "../../api/items/editItem";
import { getAllItems } from "../../api/items/getAllItems";
import { getItemById } from "../../api/items/getItemById";
import { postItem } from "../../api/items/postItem";
import { searchItem } from "../../api/items/searchItem";

const initialState = {
  isLoading: false,
  items: [],
  error: null,
  page_context: {},
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (data, { rejectWithValue }) => {
    const { authToken, filter_by, per_page, page, sort_column, sort_order } =
      data;
    try {
      const res = await getAllItems(
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
export const searchItemsByName = createAsyncThunk(
  "items/searchItemsByName",
  async (data, { dispatch, getState, rejectWithValue }) => {
    // const { authToken, item_name } = data;
    try {
      const res = await searchItem(data.authToken, data.searchParams);
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
      state.items = action.payload.items;
      state.page_context = action.payload.page_context;
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

    builder.addCase(searchItemsByName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchItemsByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    });
    builder.addCase(searchItemsByName.rejected, (state, action) => {
      console.log("In rejected : ", action);
      state.isLoading = false;
      state.items = [];
      state.error = action.payload;
    });
  },
});

export default itemsSlice.reducer;
