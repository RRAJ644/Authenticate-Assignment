import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toastMessages } from '../constants/constants'
import { useToast } from '../context/ToastContext'

const Cart = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()

  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  )

  const dispatch = useDispatch()

  const handleRemove = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })
    )
    addToast(toastMessages.cart.removed, 'success')
  }

  const handleCheckout = () => {
    if (totalQuantity > 0) {
      navigate('/checkout')
    }
  }

  return (
    <div className='container mx-auto max-lg:pt-10'>
      <div className='flex flex-col max-lg:justify-center max-lg:items-center'>
        <h1 className='text-2xl font-semibold mb-4'>Your Cart</h1>
        <p className='text-sm text-gray-500 mb-4'>
          Not ready to checkout?{' '}
          <Link to='/' className='text-black underline'>
            Continue Shopping
          </Link>
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-2/3'>
          {items?.length === 0 ? (
            <p className='text-center text-lg text-gray-500'>
              Your cart is empty.
            </p>
          ) : (
            items?.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between py-4 border-b-2 border-gray-300'
              >
                <div className='flex items-center gap-4'>
                  <div className='w-24 h-24 flex items-center justify-center overflow-hidden'>
                    <img
                      src={item?.image}
                      alt={item?.title || 'Product Image'}
                      className='w-full h-full object-contain p-2'
                    />
                  </div>
                  <div>
                    <h2 className='font-semibold'>{item?.title}</h2>
                    <p className='text-sm text-gray-500'>Size: {item?.size}</p>
                    <p className='text-sm text-gray-500'>
                      Quantity: {item?.quantity}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold text-lg'>${item?.price}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    className='text-sm text-red-500 hover:underline focus:outline-none'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='w-full h-fit lg:w-1/3 p-6 bg-gray-50 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <p className='text-sm text-gray-600'>Subtotal</p>
            <p className='font-semibold text-lg'>${totalPrice}</p>
          </div>
          <div className='flex justify-between mb-4'>
            <p className='text-sm text-gray-600'>Shipping</p>
            <p className='text-sm text-gray-500'>Calculated at the next step</p>
          </div>
          <div className='flex justify-between font-semibold text-lg mb-4'>
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          <button
            onClick={handleCheckout}
            className={`w-full py-3 rounded-md text-white focus:outline-none
            ${
              totalQuantity === 0 ? 'bg-gray-300' : 'bg-black hover:bg-gray-800'
            }`}
            disabled={totalQuantity === 0}
          >
            {totalQuantity === 0 ? 'Cart is Empty' : 'Continue to Checkout'}
          </button>
        </div>
      </div>

      <div className='w-fit mt-12 py-6 border-t-2'>
        <h2 className='font-semibold mb-2'>Order Information</h2>
        <p className='text-sm text-gray-500 underline'>Return Policy</p>
        <p className='text-sm text-gray-500 mt-2'>
          This is our example return policy, which includes everything you need
          to know about our returns and exchanges.
        </p>
      </div>
    </div>
  )
}

export default Cart
