import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Loader from '../common/Loader'

function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProtectedRoute

