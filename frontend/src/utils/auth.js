/**
 * LocalStorage-based Authentication Utility
 * Handles user registration, login, logout, and session management
 */

// Simple Base64 encoding for lightweight password hashing
const encodePassword = (password) => {
  return btoa(password)
}

const decodePassword = (encoded) => {
  try {
    return atob(encoded)
  } catch {
    return null
  }
}

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Object} - { success: boolean, message: string, user?: Object }
 */
export const registerUser = ({ name, email, password }) => {
  try {
    // Validate input
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' }
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Invalid email format' }
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    // Check if email already exists
    const userExists = existingUsers.find(user => user.email === email)
    if (userExists) {
      return { success: false, message: 'Email already registered' }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: encodePassword(password),
      createdAt: new Date().toISOString()
    }

    // Save user
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))

    // Auto-login after registration
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }))

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'Registration failed. Please try again.' }
  }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} - { success: boolean, message: string, user?: Object }
 */
export const loginUser = (email, password) => {
  try {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' }
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    // Find user by email
    const user = existingUsers.find(u => u.email === email.toLowerCase().trim())

    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Verify password
    const decodedPassword = decodePassword(user.password)
    if (decodedPassword !== password) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Set current user
    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    return {
      success: true,
      message: 'Login successful',
      user: currentUser
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Login failed. Please try again.' }
  }
}

/**
 * Logout user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem('currentUser')
    return { success: true, message: 'Logged out successfully' }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, message: 'Logout failed' }
  }
}

/**
 * Get current logged-in user
 * @returns {Object|null} - Current user object or null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('currentUser')
    if (!userStr) return null
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

/**
 * Update user profile
 * @param {Object} updates - { name?: string, email?: string }
 * @returns {Object} - { success: boolean, message: string, user?: Object }
 */
export const updateUserProfile = (updates) => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return { success: false, message: 'Not authenticated' }
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = existingUsers.findIndex(u => u.id === currentUser.id)

    if (userIndex === -1) {
      return { success: false, message: 'User not found' }
    }

    // Update user data
    if (updates.name) {
      existingUsers[userIndex].name = updates.name.trim()
      currentUser.name = updates.name.trim()
    }

    if (updates.email) {
      // Check if new email is already taken
      const emailExists = existingUsers.find(
        u => u.email === updates.email.toLowerCase().trim() && u.id !== currentUser.id
      )
      if (emailExists) {
        return { success: false, message: 'Email already in use' }
      }

      existingUsers[userIndex].email = updates.email.toLowerCase().trim()
      currentUser.email = updates.email.toLowerCase().trim()
    }

    // Save updated users
    localStorage.setItem('users', JSON.stringify(existingUsers))
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    return {
      success: true,
      message: 'Profile updated successfully',
      user: currentUser
    }
  } catch (error) {
    console.error('Update profile error:', error)
    return { success: false, message: 'Update failed. Please try again.' }
  }
}

