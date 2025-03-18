import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: null, // Store the cart's _id
  userId: null, // Store the userId
  cartItems: [], // Store the products array
  totalPrice: 0, // Store the totalPrice
  createdAt: null, // Store the createdAt timestamp
  updatedAt: null, // Store the updatedAt timestamp
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      const { _id, userId, products, totalPrice, createdAt, updatedAt } =
        action.payload;

      state.cartId = _id; // Store the cart's _id
      state.userId = userId; // Store the userId
      state.cartItems = products; // Store the products array directly
      state.totalPrice = totalPrice; // Store the totalPrice
      state.createdAt = createdAt; // Store the createdAt timestamp
      state.updatedAt = updatedAt; // Store the updatedAt timestamp
    },

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        // If the item already exists, update its quantity and price
        existingItem.quantity += newItem.quantity;
        existingItem.price += newItem.price * newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cartItems array
        state.cartItems.push({
          productId: newItem.productId,
          productName: newItem.productName,
          quantity: newItem.quantity,
          price: newItem.price,
        });
      }

      // Update the totalPrice
      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === itemId
      );

      if (existingItem) {
        // Subtract the item's total price from the totalPrice
        state.totalPrice -= existingItem.price * existingItem.quantity;
        // Remove the item from the cartItems array
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== itemId
        );
      }
    },

    clearCart(state) {
      // Reset the cart to its initial state
      state.cartId = null;
      state.userId = null;
      state.cartItems = [];
      state.totalPrice = 0;
      state.createdAt = null;
      state.updatedAt = null;
    },
  },
});

export const { setCart, addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
