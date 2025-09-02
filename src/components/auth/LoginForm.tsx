import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { Compass, Eye, EyeOff, LogIn, UserPlus, AlertCircle, CheckCircle, Wrench } from 'lucide-react'

interface LoginFormProps {
  onSuccess: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signUp, connectionStatus, isMockMode } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, role)
      }
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const isSupabaseConfigured = connectionStatus === 'connected'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-2xl">
              <Compass className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              NaviRiti
            </span>
          </h1>
          <p className="text-gray-600">Your AI-Powered Career Compass</p>
        </div>

        {/* Connection Status */}
        <div className="mb-6">
          {connectionStatus === 'checking' && (
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Checking connection...</span>
            </div>
          )}
          
          {isMockMode && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-yellow-700">
                <Wrench className="h-4 w-4" />
                <span className="text-sm font-medium">Demo Mode Active</span>
              </div>
              <p className="text-xs text-yellow-600 mt-2">
                Using mock authentication. Any email/password will work for testing.
              </p>
            </div>
          )}
          
          {connectionStatus === 'connected' && !isMockMode && (
            <div className="flex items-center justify-center space-x-2 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Connected to Supabase</span>
            </div>
          )}
          
          {connectionStatus === 'disconnected' && !isMockMode && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Supabase Not Configured</span>
              </div>
              <p className="text-xs text-red-600 mt-2">
                Please update your .env.local file with your Supabase credentials.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder={isMockMode ? "Any email (e.g., test@example.com)" : "Enter your email"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder={isMockMode ? "Any password" : "Enter your password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                {isLogin ? <LogIn className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {isLogin ? 'Sign In' : 'Sign Up'}
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Demo Instructions */}
        {isMockMode && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Instructions:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Use any email and password to login</li>
              <li>• Choose "admin" role to access admin dashboard</li>
              <li>• Choose "user" role to access user dashboard</li>
              <li>• All data is simulated for demonstration</li>
            </ul>
          </div>
        )}

        {/* Setup Instructions */}
        {!isMockMode && connectionStatus === 'disconnected' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Setup Instructions:</h3>
            <ol className="text-xs text-blue-700 space-y-1">
              <li>1. Create a Supabase project at supabase.com</li>
              <li>2. Go to Settings → API</li>
              <li>3. Copy your Project URL and anon key</li>
              <li>4. Update .env.local with your credentials</li>
              <li>5. Restart the development server</li>
            </ol>
          </div>
        )}
      </Card>
    </div>
  )
}

export default LoginForm
