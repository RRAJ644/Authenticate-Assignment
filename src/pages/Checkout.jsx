import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from '../context/ToastContext'
import { toastMessages } from '../constants/constants'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart.items)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit_card',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addToast(toastMessages.order.placed, 'success')
    navigate('/')
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <section className='p-6 max-w-5xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6'>Checkout</h2>

      <div className='bg-gray-100 p-4 rounded-md mb-6'>
        <h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
        {cartItems?.map((item) => (
          <div key={item.id} className='flex justify-between mb-2'>
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className='border-t pt-4 mt-4 flex justify-between font-bold'>
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <h3 className='text-xl font-semibold'>Shipping Details</h3>
        <input
          type='text'
          name='name'
          placeholder='Full Name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded-md'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='address'
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded-md'
        />
        <div className='flex space-x-4'>
          <input
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleChange}
            required
            className='w-1/2 p-2 border rounded-md'
          />
          <input
            type='text'
            name='postalCode'
            placeholder='Postal Code'
            value={formData.postalCode}
            onChange={handleChange}
            required
            className='w-1/2 p-2 border rounded-md'
          />
        </div>

        <div className='mt-4'>
          <h3 className='text-xl font-semibold mb-2'>Payment Method</h3>
          <select
            name='paymentMethod'
            value={formData.paymentMethod}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          >
            <option value='credit_card'>Credit Card</option>
            <option value='paypal'>PayPal</option>
            <option value='cod'>Cash on Delivery</option>
          </select>
        </div>

        <button
          type='submit'
          className={`w-full mt-4 py-2 rounded-md text-white ${
            cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-600'
          }`}
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </form>
    </section>
  )
}

export default Checkout
