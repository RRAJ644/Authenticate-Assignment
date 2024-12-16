import { createSlice } from '@reduxjs/toolkit'
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/helper'

const initialState = {
  items: loadFromLocalStorage('wishlist') || [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const productId = action.payload.id
      const existingIndex = state.items.findIndex(
        (item) => item.id === productId
      )

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1)
      } else {
        state.items.push(action.payload)
      }

      saveToLocalStorage('wishlist', state.items)
    },
  },
})

export const selectWishlistItems = (state) => state.wishlist.items

export const { toggleWishlistItem } = wishlistSlice.actions

export default wishlistSlice.reducer
