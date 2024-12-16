import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toggleWishlistItem } from '../redux/wishlistSlice'
import { useNavigate } from 'react-router-dom'

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    dispatch(toggleWishlistItem({ id: product.id }))
  }

  return (
    <div
      className='bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-xl overflow-hidden w-[20rem] p-4 border flex flex-col cursor-pointer'
      onClick={handleClick}
    >
      <div className='relative'>
        <img
          src={product?.image}
          alt={product?.title}
          className='w-full h-48 object-contain rounded-t-lg bg-slate-50'
        />
        <button
          onClick={handleRemove}
          className='absolute top-2 right-2 bg-white p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 shadow-md'
          aria-label='Remove from wishlist'
        >
          <AiFillHeart size={20} />
        </button>
      </div>

      <div className='flex flex-col flex-grow space-y-3 mt-3'>
        <h2 className='text-lg font-semibold truncate text-gray-800'>
          {product?.title}
        </h2>

        <div className='flex justify-between items-center mt-auto'>
          <span className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold'>
            ${product?.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/products/${product.id}`)
            }}
            className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition'
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
