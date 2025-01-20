import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminData(state, action) {
      state.adminData = action.payload;
    },
    clearAdminData(state) {
      state.adminData = null;
    },
  },
});

export const { setAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
