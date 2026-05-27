import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShieldCheck } from 'lucide-react'
import logo from '../../assets/logo.png'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Founder', path: '/founder' },
  { label: 'Notes', path: '/notes' },
  { label: 'Video Classes', path: '/videos' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="TalksBhati Pharmacy"
              className="h-9 w-auto group-hover:scale-105 transition-transform drop-shadow-md" />
            <div>
              <span className="font-bold text-base sm:text-lg" style={{ background: 'linear-gradient(to right, #059669, #0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TalksBhati
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block leading-none -mt-0.5">Pharmacy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Login button — desktop */}
            <Link to="/notes-admin/login"
              className="hidden md:flex items-center gap-1.5 text-sm py-2 px-4 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:opacity-90"
              style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
            <button onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                  {link.label}
                </Link>
              ))}
              {/* Admin button in mobile menu */}
              <Link to="/notes-admin/login"
                className="flex items-center justify-center gap-2 mt-2 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
                <ShieldCheck className="w-4 h-4" />
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
