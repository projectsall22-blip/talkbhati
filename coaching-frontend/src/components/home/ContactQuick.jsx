import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactQuick() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Notes Request', message: '' })
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate send (no backend)
    await new Promise(r => setTimeout(r, 800))
    toast.success('Message received! We will get back to you soon.')
    setForm({ name: '', email: '', phone: '', subject: 'Notes Request', message: '' })
    setLoading(false)
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} className="text-center mb-12">
          <span className="pill bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4 inline-flex">
            Get in Touch
          </span>
          <h2 className="section-title">
            Have a Question or{' '}
            <span style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Need Specific Notes?
            </span>
          </h2>
          <p className="section-subtitle">
            Can't find what you're looking for? Just ask — we'll try to add it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }} className="lg:col-span-2 space-y-4">

            {[
              { icon: Phone, label: 'Mobile', value: '+91-8267908842', href: 'tel:+918267908842', color: '#059669' },
              { icon: Mail, label: 'Email', value: 'mazidalikhan9717@gmail.com', href: 'mailto:mazidalikhan9717@gmail.com', color: '#0d9488' },
              { icon: MapPin, label: 'Address', value: 'C-28, Rafikabad Colony, Dasna, Ghaziabad', href: null, color: '#0891b2' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:underline break-all">{value}</a>
                  ) : (
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <a href="https://wa.me/918267908842?text=Hello%21%20I%20need%20pharmacy%20study%20notes."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 bg-green-500 hover:bg-green-600 shadow-md">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-7 shadow-sm space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Your Name *</label>
                <input className="input-field" placeholder="Full name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email *</label>
                <input className="input-field" type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Subject</label>
              <select className="input-field" value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option>Notes Request</option>
                <option>D.Pharma Notes</option>
                <option>B.Pharma Notes</option>
                <option>M.Pharma Notes</option>
                <option>Video Class Request</option>
                <option>Report Error in Notes</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Message *</label>
              <textarea className="input-field resize-none" rows={4}
                placeholder="Which notes do you need? Which semester/subject?"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#059669,#0d9488)' }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Send className="w-4 h-4" />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
