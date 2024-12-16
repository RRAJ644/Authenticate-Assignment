import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoints, sizes, toastMessages } from '../constants/constants'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toggleWishlistItem, selectWishlistItems } from '../redux/wishlistSlice'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import Loader from '../components/Loader'
import { useToast } from '../context/ToastContext'
import Rating from '../components/Rating'

const Product = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { id } = useParams()

  const { data: product, error, loading } = useFetch(endpoints.productById(id))
  const wishlistItems = useSelector(selectWishlistItems) || []

  const isWishlist = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(0)

  const handleSizeClick = (size) => {
    setSelectedSize(selectedSize === size ? null : size)
    if (selectedSize !== size) {
      setQuantity(0)
      addToast(toastMessages.cart.sizeForQuantity, 'success')
    }
  }

  const handleQuantityChange = (delta) => {
    if (!selectedSize) {
      addToast(toastMessages.cart.selectSize, 'error')
      return
    }

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta
      if (newQuantity <= 0) {
        addToast(toastMessages.cart.lessQuantity, 'error')
        return 0
      }
      return newQuantity
    })
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast(toastMessages.cart.selectSizeBefore, 'error')
      return
    }
    if (quantity <= 0) {
      addToast(toastMessages.cart.validQuantity, 'error')
      return
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        size: selectedSize,
        quantity: quantity,
        image: product.image,
      })
    )
    addToast(toastMessages.cart.added, 'success')
  }

  const handleWishlistToggle = () => {
    dispatch(
      toggleWishlistItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    )
    addToast(
      isWishlist ? toastMessages.wishlist.remove : toastMessages.wishlist.added,
      'success'
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    product && (
      <section className='px-4 md:px-10 lg:px-20 py-10 bg-white'>
        <div className='flex flex-col md:flex-row items-center gap-10'>

          <div className='w-full md:w-1/2 relative'>
            <img
              src={product.image || '/default-image.jpg'}
              alt={product.title}
              className='w-full max-h-[40rem] p-10 object-contain'
            />

            <button
              onClick={handleWishlistToggle}
              className='absolute top-4 right-4 p-2 text-2xl transition-all'
            >
              {isWishlist ? (
                <AiFillHeart className='text-red-500' />
              ) : (
                <AiOutlineHeart className='text-gray-500' />
              )}
            </button>
          </div>

          <div className='w-full md:w-1/2 flex flex-col'>
            <h1 className='text-4xl font-bold text-gray-800 mb-3'>
              {product.title}
            </h1>
            <p className='text-2xl font-semibold text-gray-600 mb-2'>
              {`$${product.price}`}
            </p>

            <div className='mb-4'>
              <Rating rating={product.rating.rate || 4.0} />
            </div>

            <p className='text-gray-700 leading-relaxed mb-6'>
              {product.description}
            </p>

            <div className='mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-2'>Size</h2>
              <div className='flex flex-wrap gap-4'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                Quantity
              </h2>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className='px-4 py-2 border rounded-md text-lg font-semibold'
                >
                  -
                </button>
                <span className='text-xl'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='px-4 py-2 border rounded-md text-lg font-semibold'
                >
                  +
                </button>
              </div>
            </div>

            <div className='mb-6'>
              <button
                onClick={handleAddToCart}
                className={`w-full md:w-auto px-6 py-3 rounded-md text-lg font-semibold text-white transition-all ${
                  selectedSize
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedSize || quantity <= 0}
              >
                Add to Cart - ${product.price * quantity}
              </button>
            </div>

            <div className='text-sm text-gray-600'>
              <p className='mb-1'>
                Free standard shipping{' '}
                <span className='ml-6 underline'>Free returns</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  )
}

export default Product
