import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      if (user.role !== 'admin') {
        toast.error('Admin access required')
        return
      }
      toast.success('Welcome back, Admin!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">EduPrime Coaching Institute</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="admin@coaching.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type={showPass ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Lock className="w-4 h-4" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <p className="text-xs text-gray-500 text-center">Default: admin@coaching.com / Admin@123</p>
        </div>
      </motion.div>
    </div>
  )
}
