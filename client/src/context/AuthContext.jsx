import { createContext, useState, useEffect } from 'react'
import { loginRequest } from '../api/authApi'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('transitops_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await loginRequest(email, password)
    localStorage.setItem('transitops_token', res.token)
    localStorage.setItem('transitops_user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  const logout = () => {
    localStorage.removeItem('transitops_token')
    localStorage.removeItem('transitops_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

