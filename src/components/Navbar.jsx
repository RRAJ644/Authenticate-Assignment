import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaTimes } from 'react-icons/fa'
import { Login, Logout, toastMessages } from '../constants/constants'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const Navbar = ({ data = [], siteName = 'ShopMart' }) => {
  const navigate = useNavigate()

  const { isAuthenticated, logout } = useAuth()
  const { addToast } = useToast()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderNavLinks = useCallback(() => {
    return data?.map(({ title, to }) => (
      <li key={to} className='my-4'>
        <Link
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className='block text-2xl hover:text-primary focus:text-primary transition-colors'
        >
          {title}
        </Link>
      </li>
    ))
  }, [data])

  const handleLogout = () => {
    logout()
    navigate('/login')
    addToast(toastMessages.auth.logout, 'success')
  }
  return (
    <nav className='w-full flex justify-between items-center border-b-2  px-5 shadow-gray-300'>
      <div className='flex flex-1'>
        <Link
          to={'/'}
          className='font-bold xl:text-4xl lg:text-3xl md:text-2xl text-xl'
        >
          {siteName}
        </Link>
      </div>

      <div className='lg:flex hidden text-2xl justify-center items-center gap-8'>
        <ul className='flex gap-10'>{renderNavLinks()}</ul>
        {!isAuthenticated ? (
          <Link to='/login' className='underline'>
            {Login}
          </Link>
        ) : (
          <button onClick={handleLogout} className='underline'>
            {Logout}
          </button>
        )}
      </div>

      <div className='lg:hidden relative'>
        {!isMenuOpen && (
          <button
            aria-label='Open navigation menu'
            onClick={() => setIsMenuOpen(true)}
            className='text-3xl z-50 relative'
          >
            <GiHamburgerMenu className='z-50 text-primary' />
          </button>
        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform ease-in-out duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isMenuOpen && (
            <div className='flex justify-end p-6'>
              <button
                aria-label='Close menu'
                onClick={() => setIsMenuOpen(false)}
                className='text-3xl z-50'
              >
                <FaTimes className='text-primary' />
              </button>
            </div>
          )}

          <ul className='p-6 mt-12 flex flex-col items-center'>
            {renderNavLinks()}
            {!isAuthenticated ? (
              <Link
                to='/login'
                onClick={() => setIsMenuOpen(false)}
                className='underline mt-4'
              >
                {Login}
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false)
                }}
                className='underline mt-4'
              >
                {Logout}
              </button>
            )}
          </ul>
        </div>

        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black opacity-50 z-30'
            onClick={() => setIsMenuOpen(false)}
            aria-hidden='true'
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
