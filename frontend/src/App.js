import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import Home from './pages/Home/Home'
import Yoga from './pages/Yoga/Yoga'
import About from './pages/About/About'
import Tutorials from './pages/Tutorials/Tutorials'
import DietPlanner from './pages/DietPlanner/DietPlanner'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import ProgressDashboard from './pages/ProgressDashboard/ProgressDashboard'

import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/tutorials' element={<Tutorials />} />
          <Route path='/profile' element={<Profile />} />
          <Route 
            path='/start' 
            element={
              <PrivateRoute>
                <Yoga />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/yoga' 
            element={
              <PrivateRoute>
                <Yoga />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/diet-planner' 
            element={
              <PrivateRoute>
                <DietPlanner />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/progress' 
            element={
              <PrivateRoute>
                <ProgressDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}


