import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllParties } from "../../api/party/allParties";
import { postParty } from "../../api/party/postParty";
import { singleParty } from "../../api/party/singleParty";

const initialState = {
  isLoading: false,
  parties: [],
  error: "",
};
export const fetchParties = createAsyncThunk(
  "party/allParties",
  async (authToken) => {
    const res = await getAllParties(authToken);
    return res?.data;
  }
);
export const fetchParty = createAsyncThunk(
  "party/singleParty",
  async (data) => {
    const { authToken, id } = data;

    const res = await singleParty(authToken, id);
    return res?.data;
  }
);
export const newParty = createAsyncThunk("party/new", async (data) => {
  const { authToken, party } = data;
  const res = await postParty(authToken, party);
  return res?.data;
});
export const partySlice = createSlice({
  name: "party",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchParties.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchParties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.parties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchParties.rejected, (state, action) => {
      state.isLoading = false;
      state.parties = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchParty.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchParty.fulfilled, (state, action) => {
      state.isLoading = false;
      state.parties = [action.payload];
      state.error = "";
    });
    builder.addCase(fetchParty.rejected, (state, action) => {
      state.isLoading = false;
      state.parties = [];
      state.error = action.error.message;
    });
  },
});
export default partySlice.reducer;
