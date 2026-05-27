import { createContext, useContext, useState, useEffect } from 'react'

// ─── Hardcoded admin credentials (frontend-only, no backend needed) ───
const ADMIN_EMAIL = 'admin@talksbhati.com'
const ADMIN_PASSWORD = 'TalksBhati@123'
const ADMIN_USER = { id: '1', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' }

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on page load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tbp_admin')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed?.role === 'admin') setUser(parsed)
      }
    } catch {
      localStorage.removeItem('tbp_admin')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    // Simulate async (keeps same API shape as before)
    await new Promise(r => setTimeout(r, 600))

    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem('tbp_admin', JSON.stringify(ADMIN_USER))
      setUser(ADMIN_USER)
      return ADMIN_USER
    }

    // Wrong credentials
    const err = new Error('Invalid credentials')
    err.response = { data: { message: 'Invalid email or password' } }
    throw err
  }

  const logout = () => {
    localStorage.removeItem('tbp_admin')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
