import React, { createContext, useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../constants/constants'
import { Navigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const data = await response.json()
      setIsAuthenticated(true)
      localStorage.setItem('token', data.token)
    } catch (error) {
      setError(error.message)
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
