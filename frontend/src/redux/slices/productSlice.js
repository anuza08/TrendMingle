import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
  },
});

export const { setCurrentProduct } = productSlice.actions;

export default productSlice.reducer;
