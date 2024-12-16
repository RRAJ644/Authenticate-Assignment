import React, { createContext, useState, useContext } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type) => {
    setToasts([...toasts, { message, type }])
  }

  const removeToast = (index) => {
    setToasts(toasts.filter((_, i) => i !== index))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className='fixed bottom-0 right-0 p-4 z-50'>
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
