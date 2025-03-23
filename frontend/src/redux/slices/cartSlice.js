import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch cart items from the API
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

// Add item to cart via API
const addItemToCartAPI = async (payload) => {
  const url = `http://localhost:8080/cart/add`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!result.ok) {
      throw new Error("Failed to add item to cart");
    }
    return await result.json();
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Remove item from cart via API
const removeItemFromCartAPI = async (userId, productId) => {
  const url = `http://localhost:8080/cart/delete-item`;
  try {
    const result = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    if (!result.ok) throw new Error("Failed to remove item from cart");
    return await result.json();
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const data = await getAllItems();
    const mappedProducts = data.cart.products.map((product) => ({
      ...product,
    }));
    console.log("cart data", mappedProducts);
    return mappedProducts;
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { dispatch }) => {
    const response = await addItemToCartAPI(payload);
    dispatch(fetchCartItems()); // Refresh cart items after adding
    return response;
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { dispatch }) => {
    await removeItemFromCartAPI(userId, productId);
    dispatch(fetchCartItems()); // Refresh cart items after removing
    return productId; // Return the deleted productId for state update
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.tempItems = action.payload;
        state.status = "succeeded";
        state.totalPrice = action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Filter out the deleted item from the items array
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.tempItems = state.tempItems.filter(
          (item) => item._id !== action.payload
        );
        state.status = "succeeded";
        // Recalculate the total price
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      });
  },
});

export default cartSlice.reducer;
