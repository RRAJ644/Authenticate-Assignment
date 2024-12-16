import React, { useEffect, useState } from 'react'
import AboutHeader from '../components/AboutHeader'
import {
  aboutHeader,
  endpoints,
  filtersData,
  sortingFactor,
} from '../constants/constants'
import Filters from '../components/Filters'
import ProductGrid from '../components/ProductGrid'
import useFetch from '../hooks/useFetch'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import FilterModal from '../components/FilterModal'

const Products = () => {
  const productsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [allProducts, setAllProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState(null)
  const [categorySelected, setCategorySelected] = useState({})
  const [selectedSort, setSelectedSort] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)

  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch(endpoints.categories)

  const {
    data: totalProducts,
    loading: productsLoading,
    error: productsError,
  } = useFetch(endpoints.products)

  useEffect(() => {
    if (totalProducts) {
      setAllProducts(totalProducts)
    }

    const productsToPaginate =
      sortedProducts?.length > 0 ? sortedProducts : totalProducts

    if (productsToPaginate) {
      setTotalPages(Math.ceil(productsToPaginate.length / productsPerPage))
    }
  }, [totalProducts, sortedProducts])

  const handleChange = (index) => {
    setCategorySelected((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const filterByCategory = () => {
    if (!categories || categories.length === 0) return

    const selectedCategories = Object.keys(categorySelected)
      .filter((key) => categorySelected[key])
      .map((key) => categories[parseInt(key)])

    if (selectedCategories.length === 0) {
      setSortedProducts(null)
      return
    }

    const filteredProducts = allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    )
    setSortedProducts(filteredProducts)
  }

  useEffect(() => {
    filterByCategory()
  }, [categorySelected])

  const handleClear = () => {
    setCategorySelected({})
    setSortedProducts(null)
    setSelectedSort('')
  }

  const handleSort = async (sortOrder) => {
    if (!sortOrder) return
    setSelectedSort(sortOrder)

    const [factor, direction] = sortOrder.split('_')
    const isAscending = direction === 'asc'

    let updatedProducts = sortedProducts
      ? [...sortedProducts]
      : [...allProducts]

    updatedProducts.sort((a, b) => {
      const valueA =
        factor === sortingFactor?.pricing ? a.price : a.rating?.rate
      const valueB =
        factor === sortingFactor?.pricing ? b.price : b.rating?.rate

      if (valueA === undefined || valueB === undefined) return 0
      return isAscending ? valueA - valueB : valueB - valueA
    })

    setSortedProducts(updatedProducts)
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const displayedProducts = sortedProducts || allProducts
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const paginatedProducts = displayedProducts?.slice(startIndex, endIndex)

  if (productsLoading || categoryLoading) {
    return <Loader />
  }

  return (
    <section className='w-full h-full flex-1 py-10'>
      <AboutHeader data={aboutHeader} />

      <div className='flex w-full xl:gap-10 2xl:gap-40 lg:gap-8'>
        <div className='hidden lg:block'>
          <Filters
            data={{ ...filtersData, categories }}
            categorySelected={categorySelected}
            handleChange={handleChange}
            handleClear={handleClear}
            handleSort={handleSort}
            sortOrder={selectedSort}
          />
        </div>

        <div className='flex flex-1 flex-col h-full justify-between items-center'>
          <button
            className='lg:hidden mb-8 px-4 py-2 bg-slate-700 w-fit text-white rounded-md'
            onClick={() => setShowFilterModal(true)}
          >
            Show Filters
          </button>

          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <FilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        filtersData={filtersData}
        categories={categories}
        categorySelected={categorySelected}
        handleChange={handleChange}
        handleClear={handleClear}
        handleSort={handleSort}
        selectedSort={selectedSort}
      />
    </section>
  )
}

export default Products
