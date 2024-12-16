import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Rating = ({ rating, maxRating = 5 }) => {
  return (
    <div className='flex items-center'>
      {[...Array(maxRating)].map((_, index) => (
        <span key={index} className='text-yellow-400 text-2xl'>
          {index < Math.floor(rating) ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
      <span className='ml-2 text-gray-700 text-lg'>{rating.toFixed(1)}</span>
    </div>
  )
}

export default Rating
