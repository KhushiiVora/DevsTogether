import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  connectedUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.socket = action.payload;
    },
    cleared: (state) => {
      state.socket = null;
      state.connectedUsers = [];
    },
    newUserSaved: (state, action) => {
      const users = [...state.connectedUsers];
      users.push(action.payload);
      state.connectedUsers = users;
    },
    connectedUsersSaved: (state, action) => {
      state.connectedUsers = action.payload;
    },
  },
});

export default socketSlice.reducer;
export const { saved, cleared, newUserSaved, connectedUsersSaved } =
  socketSlice.actions;
