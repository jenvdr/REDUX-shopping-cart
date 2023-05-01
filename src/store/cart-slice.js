import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
        state.items = action.payload.items;
    },
    addProduct(state, action) {
      console.log(`state.items: ${JSON.stringify(state)}`);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount = state.totalAmount + +newItem.price;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        }); // Only possible because redux toolkit ensures .push() won't manipulate the existing state.
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeProduct(state, action) {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        state.changed = true;

        if (existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);
        } else {
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
