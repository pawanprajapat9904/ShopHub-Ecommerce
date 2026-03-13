import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartSlice = createSlice({

  name: "cart",

  initialState: {
    items: savedCart
  },

  reducers: {

    addToCart: (state, action) => {

      const item = state.items.find(
        (i) => i._id === action.payload._id
      );

      if (item) {
        item.qty += 1;
      } else {
        state.items.push({
          ...action.payload,
          qty: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));

    },

    removeFromCart: (state, action) => {

      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.items));

    },

    increaseQty: (state, action) => {

      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (item) item.qty += 1;

      localStorage.setItem("cart", JSON.stringify(state.items));

    },

    decreaseQty: (state, action) => {

      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (item && item.qty > 1) item.qty -= 1;

      localStorage.setItem("cart", JSON.stringify(state.items));

    }

  }

});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty
} = cartSlice.actions;

export default cartSlice.reducer;