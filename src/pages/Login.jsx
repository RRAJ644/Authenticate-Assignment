import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const { login, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData.username, formData.password)
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='w-full flex justify-center items-center h-full'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-10 rounded-lg shadow-xl max-w-sm w-full'
      >
        <h2 className='text-3xl font-semibold text-center text-gray-800 mb-8'>
          Login
        </h2>

        <div className='mb-8'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700 mb-3'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='Enter your username'
            required
          />
        </div>

        <div className='mb-8'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-3'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='Enter your password'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full p-4 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-gray-600 transition duration-200 ease-in-out'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
