import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.user = action.payload;
    },
    cleared: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { saved, cleared } = userSlice.actions;
