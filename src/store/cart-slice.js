import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addProduct(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
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
        if (existingItem.qauntity === 1) {
            state.items = state.items.filter(item => item.id !== id);
        } else {
            existingItem.qauntity--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
