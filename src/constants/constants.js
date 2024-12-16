export const BASE_URL = import.meta.env.VITE_BASE_API_ENDPOINT

export const navLinks = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Cart',
    to: '/cart',
  },
  {
    title: 'Wishlist',
    to: '/wishlist',
  },
]

export const siteName = 'ShopMart'

export const aboutHeader = {
  headline: 'E-commerce',
  tagLine:
    'Your gateway to seamless online shopping and business growth. Discover, connect, and thrive in the digital marketplace.',
}

export const endpoints = {
  categories: `${BASE_URL}/products/categories`,
  products: `${BASE_URL}/products`,
  productsSorted: (sortOrder) => `${BASE_URL}/products?sort=${sortOrder}`,
  totalProducts: `${BASE_URL}/products`,
  filterCategory: (filter) => `${BASE_URL}/products/category/${filter}`,
  productById: (id) => `${BASE_URL}/products/${id}`,
}

export const filtersData = {
  title: 'Filters',
  clear: 'Clear filters',
  categoryTitle: 'Categories',
}

export const sortingFactor = {
  pricing: 'price',
  rating: 'rating',
}

export const sizes = ['S', 'M', 'L']
export const Login = 'Login'
export const Logout = 'Logout'

export const toastMessages = {
  auth: {
    login: 'Logged In Successfully',
    logout: 'Logged out',
    check: 'Please login to shop',
  },
  cart: {
    added: 'Added to cart',
    removed: 'Removed from cart',
    selectSize: 'Please select the size',
    validQuantity: 'Please select a valid quantity',
    selectSizeBefore: 'Please select a size before adding to the cart',
    lessQuantity: 'Quantity cannot be less than 1',
    sizeForQuantity: 'Size selected! Adjust quantity as needed',
  },
  wishlist: {
    added: 'Added to wishlist',
    remove: 'Remove from wishlist',

  },
  order: {
    placed: 'Order placed successfully',
  },
}
