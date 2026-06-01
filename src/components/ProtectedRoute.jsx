import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * ProtectedRoute — auth-gate omkring beskyttede sider.
 */
export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth()
  const location = useLocation()

  if (!hydrated) {
    return (
      <div className="min-h-screen grid place-items-center text-uvm-muted">
        Indlæser…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
