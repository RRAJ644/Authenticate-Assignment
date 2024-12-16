import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div
      className='bg-white shadow-lg hover:shadow-2xl rounded-lg w-[20rem] p-4 border flex flex-col cursor-pointer'
      onClick={handleClick}
    >
      <div className='relative'>
        <img
          src={product?.image}
          alt={product?.title}
          className='w-full h-48 object-contain rounded-t-lg bg-slate-100'
        />
      </div>

      <div className='flex justify-between items-center mt-6'>
        <span className='text-yellow-500 font-bold'>
          ★ {product?.rating?.rate || 0}
        </span>
        <span className='text-sm text-gray-500'>
          ({product?.rating?.count || 0} reviews)
        </span>
      </div>

      <div className='flex flex-col flex-grow space-y-4 mt-4'>
        <h2 className='text-lg font-semibold text-gray-800 truncate'>
          {product?.title}
        </h2>

        <div className='mt-auto flex justify-between items-center'>
          <span className='text-2xl font-bold text-gray-900'>
            ${product?.price}
          </span>
          <button className='px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
