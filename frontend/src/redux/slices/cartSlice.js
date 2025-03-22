import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: null,
  userId: null,
  cartItems: [],
  totalPrice: 0,
  createdAt: null,
  updatedAt: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      const { _id, userId, products, totalPrice, createdAt, updatedAt } =
        action.payload;

      state.cartId = _id;
      state.userId = userId;
      state.cartItems = products;
      state.totalPrice = totalPrice;
      state.createdAt = createdAt;
      state.updatedAt = updatedAt;
    },

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.price += newItem.price * newItem.quantity;
      } else {
        state.cartItems.push({
          productId: newItem.productId,
          productName: newItem.productName,
          quantity: newItem.quantity,
          price: newItem.price,
        });
      }

      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === itemId
      );

      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== itemId
        );
      }
    },

    clearCart(state) {
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
