import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.png'

export default function NotesAdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // If already logged in as admin, redirect straight to panel
  useEffect(() => {
    if (!authLoading && user?.role === 'admin') {
      navigate('/notes-admin', { replace: true })
    }
  }, [user, authLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const loggedUser = await login(form.email, form.password)
      if (loggedUser.role !== 'admin') {
        toast.error('Admin access required')
        return
      }
      toast.success('Welcome back!')
      // Small delay so AuthContext state settles before route guard checks
      setTimeout(() => navigate('/notes-admin', { replace: true }), 100)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#022c22,#064e3b,#134e4a)' }}>
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#022c22 0%,#064e3b 50%,#134e4a 100%)' }}>

      {/* dot grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,#34d399 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{ background: 'rgba(17,24,39,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(5,150,105,0.35)' }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="TalksBhati Pharmacy" className="h-16 w-auto drop-shadow-lg" />
          </div>
          <h1 className="text-2xl font-bold text-white">Notes Admin Panel</h1>
          <p className="text-emerald-400 text-sm mt-1">TalksBhati Pharmacy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="admin@coaching.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                style={{ background: 'rgba(31,41,55,0.8)', border: '1px solid rgba(75,85,99,0.6)' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                style={{ background: 'rgba(31,41,55,0.8)', border: '1px solid rgba(75,85,99,0.6)' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
            {loading
              ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <ShieldCheck className="w-4 h-4" />}
            {loading ? 'Signing in...' : 'Sign In to Admin'}
          </button>
        </form>

        <div className="mt-5 p-3 rounded-xl text-center"
          style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)' }}>
          <p className="text-xs text-gray-400">
            Email: <span className="text-emerald-400">admin@talksbhati.com</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Password: <span className="text-emerald-400">TalksBhati@123</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
