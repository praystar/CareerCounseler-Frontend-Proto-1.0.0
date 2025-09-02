import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './components/auth/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginForm from './components/auth/LoginForm'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import DetailedFormScreen from './components/forms/DetailedFormScreen'
import AnalysisScreen from './components/screens/AnalysisScreen'
import ResultsScreen from './components/screens/ResultsScreen'

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode
  requiredRole?: 'admin' | 'user'
}> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.user_metadata?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Login Page Component
const LoginPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.user_metadata?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }
    }
  }, [user, navigate])

  const handleLoginSuccess = () => {
    // Navigation will be handled by the useEffect above
  }

  return <LoginForm onSuccess={handleLoginSuccess} />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/user" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Detailed Form Routes */}
            <Route 
              path="/detailed-forms" 
              element={
                <ProtectedRoute requiredRole="user">
                  <DetailedFormScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analysis" 
              element={
                <ProtectedRoute requiredRole="user">
                  <AnalysisScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute requiredRole="user">
                  <ResultsScreen />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
