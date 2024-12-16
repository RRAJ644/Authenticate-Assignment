const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleClick = (e) => {
    const pageNumber = parseInt(e.target.getAttribute('data-page'))
    if (!isNaN(pageNumber)) {
      onPageChange(pageNumber)
    }
  }

  return (
    <div
      className='flex justify-center items-center gap-4 py-8'
      onClick={handleClick}
    >
      <button
        className='px-4 py-2 border'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      {pageNumbers?.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            data-page={pageNumber}
            className={`px-4 py-2 border ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        className='px-4 py-2 border'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
