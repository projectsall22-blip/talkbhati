import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function NotesAdminRoute({ children }) {
  const { user, loading } = useAuth()

  // Wait for token verification before deciding
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: '#0f172a' }}>
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user || user.role !== 'admin') {
    return <Navigate to="/notes-admin/login" replace />
  }

  return children
}
