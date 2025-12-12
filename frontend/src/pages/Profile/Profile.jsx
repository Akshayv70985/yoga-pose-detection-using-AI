import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import './Profile.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="profile-page">
      {/* Floating Gradient Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-card glass-card-strong">
          <div className="profile-header">
            <Link to="/" className="profile-logo">
              <span className="logo-gradient">Yoga</span>IntelliJ
            </Link>
            <div className="profile-avatar">
              <span className="avatar-initial">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h1 className="profile-title">Profile</h1>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/diet-planner" className="profile-button action-button">
              <span>View Diet Plan</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/progress" className="profile-button action-button">
              <span>View Progress Dashboard</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button onClick={handleLogout} className="profile-button logout-button">
              <span>Logout</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

