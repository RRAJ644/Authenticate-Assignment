import { capitalizeFirstLetter } from '../utils/helper'

const Filters = ({
  data,
  categorySelected,
  handleChange,
  handleClear,
  handleSort,
  sortOrder,
}) => {
  const { title, clear, categoryTitle, categories } = data

  return (
    <aside className='xl:w-80 lg:w-64 p-6 bg-white max-lg:bg-none rounded-lg lg:shadow-lg  overflow-y-auto'>
      <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
        <p className='text-xl font-semibold text-gray-800'>{title}</p>
        <button
          onClick={handleClear}
          className='text-sm text-blue-500 hover:underline focus:outline-none'
        >
          {clear}
        </button>
      </div>

      <div className='py-4'>
        <p className='text-lg font-medium pb-1'>{categoryTitle}</p>
        <ul className='mt-2 space-y-4'>
          {categories?.map((category, index) => (
            <li className='flex items-center space-x-3' key={category}>
              <input
                type='checkbox'
                className='w-5 h-5 text-blue-500 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400'
                checked={categorySelected[index] || false}
                onChange={() => handleChange(index)}
              />
              <label className='cursor-pointer text-sm'>
                {capitalizeFirstLetter(category)}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className='py-4'>
        <label htmlFor='sort' className='block text-md font-medium mb-2'>
          Sort By Price
        </label>
        <select
          id='sort'
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value=''>Select Price Range</option>
          <option value='price_asc'>Price: Low to High</option>
          <option value='price_desc'>Price: High to Low</option>
        </select>
      </div>

      <div className='py-4'>
        <label htmlFor='sort' className='block text-md font-medium mb-2'>
          Sort By Rating
        </label>
        <select
          id='sort'
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value=''>Select Rating Range</option>
          <option value='rating_asc'>Rating: Low to High</option>
          <option value='rating_desc'>Rating: High to Low</option>
        </select>
      </div>
    </aside>
  )
}

export default Filters
