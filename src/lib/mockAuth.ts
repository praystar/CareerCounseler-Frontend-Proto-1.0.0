// Mock authentication system for development
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful login
    if (email && password) {
      return {
        user: {
          id: 'mock-user-id',
          email: email,
          user_metadata: {
            role: email.includes('admin') ? 'admin' : 'user'
          }
        }
      }
    }
    throw new Error('Invalid credentials')
  },
  
  signUp: async (email: string, password: string, role: 'admin' | 'user') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful signup
    if (email && password) {
      return {
        user: {
          id: 'mock-user-id',
          email: email,
          user_metadata: {
            role: role
          }
        }
      }
    }
    throw new Error('Signup failed')
  },
  
  signOut: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return {}
  },
  
  getSession: async () => {
    // Return no session for mock
    return { data: { session: null }, error: null }
  }
}
