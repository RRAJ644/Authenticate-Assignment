import { createSlice } from '@reduxjs/toolkit'
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from '../utils/helper'

const initialState = loadFromLocalStorage('cart') || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, quantity, price, image, title } = action.payload

      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      )

      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.price += price * quantity
      } else {
        state.items.push({ id, size, quantity, price, image, title })
      }

      state.totalQuantity += quantity
      state.totalPrice =
        Math.round((state.totalPrice + price * quantity) * 100) / 100

      saveToLocalStorage('cart', state)
    },
    removeFromCart: (state, action) => {
      const { id, size, quantity, price } = action.payload

      state.items = state.items.filter(
        (item) => item.id !== id || item.size !== size
      )
      state.totalQuantity -= quantity
      state.totalPrice = Math.max(
        0,
        Math.round((state.totalPrice - price * quantity) * 100) / 100
      )

      saveToLocalStorage('cart', state)
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
      removeFromLocalStorage('cart')
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
