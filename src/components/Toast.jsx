import React, { useEffect, useState } from 'react'

const Toast = ({ message, type, onClose, duration = 2500 }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose()
      }, 300)
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onClose])

  const toastClasses = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
    isVisible ? 'animate-toast-slide-in' : 'animate-toast-slide-out'
  }`

  const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <div
      className={toastClasses}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
      aria-hidden={!isVisible}
    >
      <div
        className={`flex items-center ${backgroundColor} text-white p-4 rounded-lg`}
      >
        <div className='mr-3'>
          <span className='w-2.5 h-2.5 rounded-full bg-white inline-block'></span>
        </div>
        <div>{message}</div>
      </div>
    </div>
  )
}

export default Toast
