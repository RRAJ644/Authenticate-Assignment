import React from 'react'
import { useSelector } from 'react-redux'
import { selectWishlistItems } from '../redux/wishlistSlice'
import { Link } from 'react-router-dom'
import WishlistCard from '../components/WishlistCard'

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems)

  return (
    <div className='min-h-screen py-12 px-6'>
      <h1 className='text-4xl font-bold text-center mb-8'>Wish List</h1>

      <div className='text-center mb-8'>
        <Link to='/products'>
          <button className='px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition'>
            Shop All
          </button>
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <p className='text-center text-gray-500'>Your wishlist is empty.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {wishlistItems.map((item) => (
            <WishlistCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
