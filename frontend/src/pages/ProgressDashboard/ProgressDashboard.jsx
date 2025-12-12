import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {
  getWeeklyMinutes,
  getAverageAccuracy,
  getCaloriesSplit,
  getWeeklyMinutesHistory,
  getAccuracyHistory,
  resetProgress,
  getLastUpdated
} from '../../utils/progressStorage'
import './ProgressDashboard.css'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function ProgressDashboard() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Data state
  const [weeklyMinutes, setWeeklyMinutes] = useState(0)
  const [averageAccuracy, setAverageAccuracy] = useState(0)
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [weeklyMinutesData, setWeeklyMinutesData] = useState([])
  const [accuracyHistoryData, setAccuracyHistoryData] = useState([])
  const [caloriesSplit, setCaloriesSplit] = useState({ light: 0, medium: 0, intense: 0, total: 0 })

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    setMounted(true)
    loadProgressData()
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [isAuthenticated, navigate])

  const loadProgressData = () => {
    const minutes = getWeeklyMinutes()
    const accuracy = getAverageAccuracy()
    const calories = getCaloriesSplit()
    const minutesHistory = getWeeklyMinutesHistory()
    const accuracyHistory = getAccuracyHistory()
    const updated = getLastUpdated()

    setWeeklyMinutes(Math.round(minutes))
    setAverageAccuracy(accuracy)
    setCaloriesBurned(calories.total)
    setCaloriesSplit(calories)
    setWeeklyMinutesData(minutesHistory)
    setAccuracyHistoryData(accuracyHistory)
    setLastUpdated(updated)
  }

  const handleResetProgress = () => {
    if (showResetConfirm) {
      resetProgress()
      loadProgressData()
      setShowResetConfirm(false)
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 5000)
    }
  }

  // Chart data configurations
  const weeklyMinutesChartData = {
    labels: weeklyMinutesData.map(item => item.date),
    datasets: [
      {
        label: 'Minutes Practiced',
        data: weeklyMinutesData.map(item => item.minutes),
        borderColor: 'rgba(255, 255, 255, 0.9)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(102, 126, 234, 1)',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }

  const accuracyChartData = {
    labels: accuracyHistoryData.map(item => item.date),
    datasets: [
      {
        label: 'Pose Accuracy (%)',
        data: accuracyHistoryData.map(item => item.accuracy),
        backgroundColor: 'rgba(102, 126, 234, 0.6)',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }

  const caloriesPieData = {
    labels: ['Light Yoga', 'Medium Yoga', 'Intense Yoga'],
    datasets: [
      {
        data: [
          caloriesSplit.light,
          caloriesSplit.medium,
          caloriesSplit.intense
        ],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(255, 255, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(102, 126, 234, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 12,
            weight: '600'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          },
          beginAtZero: true
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 12,
            weight: '600'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
            return `${label}: ${value} cal (${percentage}%)`
          }
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  }

  if (!mounted || !user) {
    return (
      <div className="progress-loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className={`progress-dashboard-page ${mounted ? 'mounted' : ''}`}>
      {/* Floating Gradient Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Navbar */}
      <nav className="progress-navbar">
        <div className="navbar-container">
          <Link to="/" className="progress-logo">
            <span className="logo-gradient">Yoga</span>IntelliJ
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/start" className="nav-link">Yoga</Link>
            <Link to="/diet-planner" className="nav-link">Diet Planner</Link>
            <Link to="/progress" className="nav-link active">Progress</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="progress-content">
        <motion.div
          className="progress-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="progress-title">Progress Dashboard</h1>
          <p className="progress-subtitle">Track your yoga journey and see your improvements</p>
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {new Date(lastUpdated).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
        </motion.div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <motion.div
            className="summary-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="card-title">Weekly Minutes</h3>
            <p className="card-value">{weeklyMinutes}</p>
            <p className="card-unit">minutes</p>
          </motion.div>

          <motion.div
            className="summary-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="card-title">Average Accuracy</h3>
            <p className="card-value">{averageAccuracy}%</p>
            <p className="card-unit">pose accuracy</p>
          </motion.div>

          <motion.div
            className="summary-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="card-title">Calories Burned</h3>
            <p className="card-value">{caloriesBurned}</p>
            <p className="card-unit">this week</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <motion.div
            className="chart-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="chart-title">Weekly Yoga Minutes</h3>
            <div className="chart-container">
              <Line data={weeklyMinutesChartData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            className="chart-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="chart-title">Pose Accuracy Trend</h3>
            <div className="chart-container">
              <Bar data={accuracyChartData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            className="chart-card glass-card-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="chart-title">Calories Burned Breakdown</h3>
            <div className="chart-container">
              <Pie data={caloriesPieData} options={pieChartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          className="progress-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button
            onClick={handleResetProgress}
            className={`reset-button ${showResetConfirm ? 'confirm' : ''}`}
          >
            {showResetConfirm ? 'Click again to confirm reset' : 'Reset Progress'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

