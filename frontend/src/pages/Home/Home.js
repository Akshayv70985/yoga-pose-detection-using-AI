import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Home.css'

const features = [
    {
        icon: '🧘',
        title: 'AI Pose Detection',
        description: 'Instantly understand each pose with precise, real-time pose detection powered by our AI vision engine.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        icon: '✨',
        title: 'Real-time Feedback',
        description: 'Receive gentle, actionable suggestions that help align your body and deepen your practice.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        icon: '📊',
        title: 'Progress Tracking',
        description: 'Stay motivated with mindful streaks, posture history, and insights tailored to your journey.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        icon: '💡',
        title: 'Smart Yoga Insights',
        description: 'Discover curated flows, breathing tips, and mindful reminders designed for modern yogis.',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
]

export default function Home() {
    const [mounted, setMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        setMenuOpen(false)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div className={`home-page ${mounted ? 'mounted' : ''}`}>
            {/* Floating Gradient Orbs */}
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>

            {/* Modern 3-Dot Navbar */}
            <nav className="home-navbar">
                <div className="navbar-container">
                    <Link to="/" className="home-logo" onClick={closeMenu}>
                        <span className="logo-gradient">Yoga</span>IntelliJ
                    </Link>
                    <div className="menu-wrapper">
                        <button 
                            className={`menu-dots ${menuOpen ? 'active' : ''}`}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </button>
                        <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
                            {isAuthenticated() ? (
                                <>
                                    <NavLink to="/start" className="menu-item" onClick={closeMenu}>
                                        <span>Yoga</span>
                                    </NavLink>
                                    <NavLink to="/diet-planner" className="menu-item" onClick={closeMenu}>
                                        <span>Diet Planner</span>
                                    </NavLink>
                                    <NavLink to="/progress" className="menu-item" onClick={closeMenu}>
                                        <span>Progress</span>
                                    </NavLink>
                                    <NavLink to="/profile" className="menu-item" onClick={closeMenu}>
                                        <span>Profile</span>
                                    </NavLink>
                                    <button onClick={handleLogout} className="menu-item logout-item">
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/start" className="menu-item" onClick={closeMenu}>
                                        <span>Yoga</span>
                                    </NavLink>
                                    <NavLink to="/diet-planner" className="menu-item" onClick={closeMenu}>
                                        <span>Diet Planner</span>
                                    </NavLink>
                                    <NavLink to="/about" className="menu-item" onClick={closeMenu}>
                                        <span>About</span>
                                    </NavLink>
                                    <NavLink to="/login" className="menu-item" onClick={closeMenu}>
                                        <span>Login</span>
                                    </NavLink>
                                    <NavLink to="/signup" className="menu-item" onClick={closeMenu}>
                                        <span>Signup</span>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Your <span className="gradient-text">AI Yoga</span> Trainer
                            </h1>
                            <p className="hero-subtitle">
                                Improve your posture with real-time AI guidance. Experience the future of mindful movement.
                            </p>
                            <div className="hero-cta">
                                <Link to="/start">
                                    <button className="cta-primary">
                                        <span>Start Training</span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </Link>
                                <Link to="/tutorials">
                                    <button className="cta-secondary">
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="visual-card">
                                <img 
                                    src="/yogaHome1.gif" 
                                    alt="Yoga meditation animation" 
                                    className="hero-gif"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="features-header">
                        <h2 className="section-title">Powerful Features</h2>
                        <p className="section-subtitle">Everything you need for a perfect practice</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div 
                                key={feature.title} 
                                className="feature-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div 
                                    className="feature-icon"
                                    style={{ background: feature.gradient }}
                                >
                                    <span className="icon-emoji">{feature.icon}</span>
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-container">
                    <div className="footer-border"></div>
                    <div className="footer-content">
                        <p className="footer-text">© 2024 YogaIntelliJ. Mindful movement, powered by AI.</p>
                        <div className="footer-social">
                            <button type="button" className="social-icon" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </button>
                            <button type="button" className="social-icon" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                </svg>
                            </button>
                            <button type="button" className="social-icon" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
