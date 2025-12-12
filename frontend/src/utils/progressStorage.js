/**
 * Progress Tracking Utility
 * Handles user-specific progress data storage in LocalStorage
 */

/**
 * Get the storage key for a specific user's progress
 * @param {string} userId - User email or ID
 * @returns {string} Storage key
 */
const getProgressKey = (userId) => {
  return `progress_${userId}`
}

/**
 * Get current user's progress data
 * @returns {Object|null} Progress data or null
 */
const getCurrentUserProgress = () => {
  try {
    const currentUserStr = localStorage.getItem('currentUser')
    if (!currentUserStr) return null
    
    const currentUser = JSON.parse(currentUserStr)
    const progressKey = getProgressKey(currentUser.email)
    const progressStr = localStorage.getItem(progressKey)
    
    if (!progressStr) {
      // Initialize empty progress data
      const initialData = {
        sessions: [],
        lastUpdated: null
      }
      localStorage.setItem(progressKey, JSON.stringify(initialData))
      return initialData
    }
    
    return JSON.parse(progressStr)
  } catch (error) {
    console.error('Error getting user progress:', error)
    return null
  }
}

/**
 * Save progress data for current user
 * @param {Object} progressData - Progress data to save
 */
const saveProgressData = (progressData) => {
  try {
    const currentUserStr = localStorage.getItem('currentUser')
    if (!currentUserStr) {
      console.warn('No user logged in, cannot save progress')
      return false
    }
    
    const currentUser = JSON.parse(currentUserStr)
    const progressKey = getProgressKey(currentUser.email)
    localStorage.setItem(progressKey, JSON.stringify(progressData))
    return true
  } catch (error) {
    console.error('Error saving progress:', error)
    return false
  }
}

/**
 * Save a practice session
 * @param {Object} sessionData - { minutes, accuracy, calories, date, intensity }
 * @returns {boolean} Success status
 */
export const savePracticeSession = (sessionData) => {
  try {
    const { minutes, accuracy, calories, date, intensity } = sessionData
    
    if (!minutes || !accuracy || !calories || !date || !intensity) {
      console.warn('Incomplete session data')
      return false
    }
    
    const progress = getCurrentUserProgress()
    if (!progress) return false
    
    // Add new session
    const session = {
      id: Date.now().toString(),
      minutes: parseFloat(minutes),
      accuracy: parseFloat(accuracy),
      calories: parseFloat(calories),
      date: date instanceof Date ? date.toISOString() : date,
      intensity: intensity // 'light' | 'medium' | 'intense'
    }
    
    progress.sessions.push(session)
    progress.lastUpdated = new Date().toISOString()
    
    return saveProgressData(progress)
  } catch (error) {
    console.error('Error saving practice session:', error)
    return false
  }
}

/**
 * Get weekly minutes practiced (last 7 days)
 * @returns {number} Total minutes
 */
export const getWeeklyMinutes = () => {
  try {
    const progress = getCurrentUserProgress()
    if (!progress || !progress.sessions) return 0
    
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weeklySessions = progress.sessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate >= sevenDaysAgo
    })
    
    return weeklySessions.reduce((total, session) => total + session.minutes, 0)
  } catch (error) {
    console.error('Error getting weekly minutes:', error)
    return 0
  }
}

/**
 * Get accuracy history (last 7 days)
 * @returns {Array} Array of { date, accuracy } objects
 */
export const getAccuracyHistory = () => {
  try {
    const progress = getCurrentUserProgress()
    if (!progress || !progress.sessions) return []
    
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weeklySessions = progress.sessions
      .filter(session => {
        const sessionDate = new Date(session.date)
        return sessionDate >= sevenDaysAgo
      })
      .map(session => ({
        date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        accuracy: session.accuracy
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return weeklySessions
  } catch (error) {
    console.error('Error getting accuracy history:', error)
    return []
  }
}

/**
 * Get average pose accuracy
 * @returns {number} Average accuracy (0-100)
 */
export const getAverageAccuracy = () => {
  try {
    const progress = getCurrentUserProgress()
    if (!progress || !progress.sessions || progress.sessions.length === 0) return 0
    
    const total = progress.sessions.reduce((sum, session) => sum + session.accuracy, 0)
    return Math.round(total / progress.sessions.length)
  } catch (error) {
    console.error('Error getting average accuracy:', error)
    return 0
  }
}

/**
 * Get calories burned breakdown by intensity
 * @returns {Object} { light: number, medium: number, intense: number, total: number }
 */
export const getCaloriesSplit = () => {
  try {
    const progress = getCurrentUserProgress()
    if (!progress || !progress.sessions) {
      return { light: 0, medium: 0, intense: 0, total: 0 }
    }
    
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weeklySessions = progress.sessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate >= sevenDaysAgo
    })
    
    const split = {
      light: 0,
      medium: 0,
      intense: 0,
      total: 0
    }
    
    weeklySessions.forEach(session => {
      const calories = session.calories || 0
      split[session.intensity] = (split[session.intensity] || 0) + calories
      split.total += calories
    })
    
    return split
  } catch (error) {
    console.error('Error getting calories split:', error)
    return { light: 0, medium: 0, intense: 0, total: 0 }
  }
}

/**
 * Get weekly minutes history (last 7 days)
 * @returns {Array} Array of { date, minutes } objects
 */
export const getWeeklyMinutesHistory = () => {
  try {
    const progress = getCurrentUserProgress()
    if (!progress || !progress.sessions) return []
    
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    // Group sessions by date
    const dailyMinutes = {}
    
    progress.sessions
      .filter(session => {
        const sessionDate = new Date(session.date)
        return sessionDate >= sevenDaysAgo
      })
      .forEach(session => {
        const date = new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        dailyMinutes[date] = (dailyMinutes[date] || 0) + session.minutes
      })
    
    // Fill in missing days with 0
    const result = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      result.push({
        date: dateStr,
        minutes: dailyMinutes[dateStr] || 0
      })
    }
    
    return result
  } catch (error) {
    console.error('Error getting weekly minutes history:', error)
    return []
  }
}

/**
 * Reset all progress data for current user
 * @returns {boolean} Success status
 */
export const resetProgress = () => {
  try {
    const currentUserStr = localStorage.getItem('currentUser')
    if (!currentUserStr) return false
    
    const currentUser = JSON.parse(currentUserStr)
    const progressKey = getProgressKey(currentUser.email)
    
    const initialData = {
      sessions: [],
      lastUpdated: null
    }
    
    localStorage.setItem(progressKey, JSON.stringify(initialData))
    return true
  } catch (error) {
    console.error('Error resetting progress:', error)
    return false
  }
}

/**
 * Get last updated timestamp
 * @returns {string|null} ISO date string or null
 */
export const getLastUpdated = () => {
  try {
    const progress = getCurrentUserProgress()
    return progress?.lastUpdated || null
  } catch (error) {
    console.error('Error getting last updated:', error)
    return null
  }
}

