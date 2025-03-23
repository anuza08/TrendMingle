import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAllItems = async () => {
  const userId = localStorage.getItem("id");
  const url = `http://localhost:8080/cart/${userId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      throw new Error("Failed to fetch products");
    }
    return await result.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const data = await getAllItems();
    const mappedProducts = data.cart.products.map((product) => ({
      ...product,
      // imageUrl: "https://via.placeholder.com/150", // Placeholder until actual images are added
    }));
    console.log("cart data", mappedProducts);
    return mappedProducts;
  }
);

const initialState = {
  items: [],
  tempItems: [],
  status: "idle",
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const exsistingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (exsistingItem) {
        exsistingItem.quantity += 1;
        exsistingItem.totalPrice += exsistingItem.price;
        state.totalPrice += exsistingItem.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.tempItems = state.items;
      state.status = "succeeded";
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.tempItems = [...state.items];
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.tempItems = action.payload;
      state.status = "succeeded";
      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
