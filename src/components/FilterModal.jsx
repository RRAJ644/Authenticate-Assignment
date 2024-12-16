import React from 'react'
import Filters from './Filters'

const FilterModal = ({
  showFilterModal,
  setShowFilterModal,
  filtersData,
  categories,
  categorySelected,
  handleChange,
  handleClear,
  handleSort,
  selectedSort,
}) => {
  if (!showFilterModal) return null

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm'>
        <div className='flex justify-end items-center mb-4'>
          <button
            className='text-red-500 text-4xl font-bold'
            onClick={() => setShowFilterModal(false)}
          >
            ✕
          </button>
        </div>
        <Filters
          data={{ ...filtersData, categories }}
          categorySelected={categorySelected}
          handleChange={handleChange}
          handleClear={handleClear}
          handleSort={handleSort}
          sortOrder={selectedSort}
        />
      </div>
    </div>
  )
}

export default FilterModal
