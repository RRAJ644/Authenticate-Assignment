import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr max-sm:place-items-center'>
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
