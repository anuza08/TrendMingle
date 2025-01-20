import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
