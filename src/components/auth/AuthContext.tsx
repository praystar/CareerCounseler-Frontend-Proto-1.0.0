import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, User, testSupabaseConnection } from '../../lib/supabase'
import { mockAuth } from '../../lib/mockAuth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role: 'admin' | 'user') => Promise<void>
  signOut: () => Promise<void>
  connectionStatus: 'connected' | 'disconnected' | 'checking'
  isMockMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking')
  const [isMockMode, setIsMockMode] = useState(false)

  useEffect(() => {
    // Test Supabase connection first
    const checkConnection = async () => {
      setConnectionStatus('checking')
      
      // Check if we have real Supabase credentials
      const hasRealCredentials = 
        import.meta.env.VITE_SUPABASE_URL && 
        import.meta.env.VITE_SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
        import.meta.env.VITE_SUPABASE_ANON_KEY &&
        import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-anon-key-here'
      
      if (!hasRealCredentials) {
        console.log('🔧 Using mock authentication mode')
        setConnectionStatus('disconnected')
        setIsMockMode(true)
        setLoading(false)
        return
      }

      // Try real Supabase connection
      try {
        const isConnected = await testSupabaseConnection()
        setConnectionStatus(isConnected ? 'connected' : 'disconnected')
        setIsMockMode(!isConnected)
        
        if (isConnected) {
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession()
          if (error) {
            console.error('Error getting session:', error)
          } else {
            setUser(session?.user as User || null)
          }
        }
      } catch (err) {
        console.error('Error in auth initialization:', err)
        setConnectionStatus('disconnected')
        setIsMockMode(true)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()

    // Listen for auth changes (only if not in mock mode)
    if (!isMockMode) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email)
          setUser(session?.user as User || null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [isMockMode])

  const signIn = async (email: string, password: string) => {
    if (isMockMode) {
      const result = await mockAuth.signIn(email, password)
      setUser(result.user as User)
      return
    }

    if (connectionStatus !== 'connected') {
      throw new Error('Cannot connect to Supabase. Please check your configuration.')
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign in error:', error)
      throw new Error(error.message || 'Failed to sign in')
    }
  }

  const signUp = async (email: string, password: string, role: 'admin' | 'user') => {
    if (isMockMode) {
      const result = await mockAuth.signUp(email, password, role)
      setUser(result.user as User)
      return
    }

    if (connectionStatus !== 'connected') {
      throw new Error('Cannot connect to Supabase. Please check your configuration.')
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    })
    
    if (error) {
      console.error('Sign up error:', error)
      throw new Error(error.message || 'Failed to sign up')
    }
  }

  const signOut = async () => {
    if (isMockMode) {
      await mockAuth.signOut()
      setUser(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
      throw new Error(error.message || 'Failed to sign out')
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    connectionStatus,
    isMockMode,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
