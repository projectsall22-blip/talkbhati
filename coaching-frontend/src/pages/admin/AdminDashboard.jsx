import { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Trophy, FileText, PlayCircle, Image, MessageSquare,
  Settings, LogOut, GraduationCap, Menu, X, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminHome from './sections/AdminHome'
import AdminAchievements from './sections/AdminAchievements'
import AdminNotes from './sections/AdminNotes'
import AdminVideos from './sections/AdminVideos'
import AdminGallery from './sections/AdminGallery'
import AdminContacts from './sections/AdminContacts'
import AdminSettings from './sections/AdminSettings'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Trophy, label: 'Achievements', path: '/admin/achievements' },
  { icon: FileText, label: 'Notes', path: '/admin/notes' },
  { icon: PlayCircle, label: 'Videos', path: '/admin/videos' },
  { icon: Image, label: 'Gallery', path: '/admin/gallery' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/contacts' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const currentLabel = navItems.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">EduPrime</div>
              <div className="text-gray-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path || (path !== '/admin/dashboard' && location.pathname.startsWith(path))
            return (
              <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}>
                <Icon className="w-4 h-4" />
                {label}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{user?.name}</div>
              <div className="text-gray-400 text-xs truncate">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-xl text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-white font-semibold">{currentLabel}</div>
          <Link to="/" target="_blank"
            className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            View Website →
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="notes" element={<AdminNotes />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<AdminHome />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
