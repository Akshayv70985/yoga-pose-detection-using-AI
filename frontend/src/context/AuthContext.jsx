import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  registerUser as registerUserUtil,
  loginUser as loginUserUtil,
  logoutUser as logoutUserUtil,
  getCurrentUser,
  isAuthenticated as isAuthenticatedUtil
} from '../utils/auth'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  // Listen for storage changes (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const signup = async ({ name, email, password }) => {
    const result = registerUserUtil({ name, email, password })
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const login = async (email, password) => {
    const result = loginUserUtil(email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    const result = logoutUserUtil()
    if (result.success) {
      setUser(null)
    }
    return result
  }

  const isAuthenticated = () => {
    return isAuthenticatedUtil() && user !== null
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

