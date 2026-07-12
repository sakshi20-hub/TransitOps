import { useState, useEffect, useRef } from 'react'
import { Bell, ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function initialsOf(name) {
  if (!name) return '?'
  return name.slice(0, 2).toUpperCase()
}

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-breadcrumb">Fleet Management</span>
      </div>

      {user && (
        <div className="navbar-right">
          <button className="icon-btn" aria-label="Notifications">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>

          <div className="navbar-user" ref={menuRef} onClick={() => setMenuOpen((o) => !o)}>
            <span className="user-avatar">{initialsOf(user.name)}</span>
            <div className="navbar-user-info">
              <span className="navbar-user-name">{user.name}</span>
              <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
            </div>
            <ChevronDown size={16} className={`user-chevron ${menuOpen ? 'open' : ''}`} />

            {menuOpen && (
              <div className="user-dropdown" onClick={(e) => e.stopPropagation()}>
                <button className="user-dropdown-item" onClick={handleLogout}>
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
