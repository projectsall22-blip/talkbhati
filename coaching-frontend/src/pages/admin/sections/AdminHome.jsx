import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, FileText, PlayCircle, MessageSquare, Image, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'

export default function AdminHome() {
  const [stats, setStats] = useState({ achievements: 0, notes: 0, videos: 0, messages: 0, gallery: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/achievements').catch(() => ({ data: [] })),
      api.get('/notes').catch(() => ({ data: [] })),
      api.get('/videos').catch(() => ({ data: [] })),
      api.get('/contact').catch(() => ({ data: [] })),
      api.get('/gallery').catch(() => ({ data: [] })),
    ]).then(([a, n, v, c, g]) => {
      setStats({ achievements: a.data.length, notes: n.data.length, videos: v.data.length, messages: c.data.length, gallery: g.data.length })
    })
  }, [])

  const cards = [
    { icon: Trophy, label: 'Achievements', value: stats.achievements, path: '/admin/achievements', color: 'from-yellow-500 to-orange-500' },
    { icon: FileText, label: 'Notes', value: stats.notes, path: '/admin/notes', color: 'from-blue-500 to-indigo-500' },
    { icon: PlayCircle, label: 'Videos', value: stats.videos, path: '/admin/videos', color: 'from-red-500 to-pink-500' },
    { icon: MessageSquare, label: 'Messages', value: stats.messages, path: '/admin/contacts', color: 'from-green-500 to-emerald-500' },
    { icon: Image, label: 'Gallery', value: stats.gallery, path: '/admin/gallery', color: 'from-purple-500 to-violet-500' },
  ]
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Admin 👋</h1>
        <p className="text-gray-400 text-sm">Here's what's happening with your institute today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map(({ icon: Icon, label, value, path, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <Link to={path}
              className="block bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl group">
              <div className={`w-10 h-10 bg-linear-to-br ${color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
              <div className="text-gray-400 text-xs">{label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="text-white font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Achievement', path: '/admin/achievements', color: 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' },
            { label: 'Upload Notes', path: '/admin/notes', color: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
            { label: 'Add Video', path: '/admin/videos', color: 'bg-red-500/10 text-red-400 hover:bg-red-500/20' },
            { label: 'View Messages', path: '/admin/contacts', color: 'bg-green-500/10 text-green-400 hover:bg-green-500/20' },
          ].map(({ label, path, color }) => (
            <Link key={label} to={path}
              className={`${color} px-4 py-3 rounded-xl text-sm font-medium transition-colors text-center`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
