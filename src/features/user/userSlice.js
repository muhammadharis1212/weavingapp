import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: (state, { payload }) => {
      console.log("in addUser reducer : ");
      state.user = payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
