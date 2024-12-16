import './App.css'
import AppLayout from './layout/Layout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import PrivateRoute from './routes/PrivateRoute'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ToastProvider } from './context/ToastContext'
import Checkout from './pages/Checkout'

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <Products /> },
        { path: '/products', element: <Products /> },
        { path: '/products/:id', element: <Product /> },
        {
          path: '/cart',
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },
        {
          path: '/wishlist',
          element: (
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          ),
        },
        {
          path: '/checkout',
          element: (
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          ),
        },
        { path: '/login', element: <Login /> },
      ],
    },
  ])
  return (
    <ToastProvider>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </ToastProvider>
  )
}

export default App
