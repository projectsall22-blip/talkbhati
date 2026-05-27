import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

const WHATSAPP = '918267908842'
const PHONE = '+91-8267908842'
const EMAIL = 'mazidalikhan9717@gmail.com'
const ADDRESS = 'C-28, Rafikabad Colony, Dasna, Ghaziabad'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Notes Request', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Message sent! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: 'Notes Request', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg,#022c22 0%,#064e3b 50%,#134e4a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact{' '}
              <span style={{ background: 'linear-gradient(to right,#34d399,#2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Us
              </span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Need specific notes, have a suggestion, or want to collaborate? We're here to help.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Contact info cards ── */}
          <div className="space-y-4">
            {[
              {
                icon: Phone, title: 'Mobile',
                lines: [PHONE],
                href: `tel:${PHONE}`,
                color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
              },
              {
                icon: Mail, title: 'Email',
                lines: [EMAIL],
                href: `mailto:${EMAIL}`,
                color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600'
              },
              {
                icon: MapPin, title: 'Address',
                lines: [ADDRESS],
                href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`,
                color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600'
              },
              {
                icon: Clock, title: 'Response Time',
                lines: ['Mon – Sat: Within 24 hours', 'Sunday: Within 48 hours'],
                href: null,
                color: 'bg-green-100 dark:bg-green-900/30 text-green-600'
              },
            ].map(({ icon: Icon, title, lines, href, color }) => (
              <motion.div key={title}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-transform block">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{title}</div>
                      {lines.map(l => <div key={l} className="text-sm text-gray-500 dark:text-gray-400 break-all">{l}</div>)}
                    </div>
                  </a>
                ) : (
                  <div className="card p-5 flex items-start gap-4">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{title}</div>
                      {lines.map(l => <div key={l} className="text-sm text-gray-500 dark:text-gray-400">{l}</div>)}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* WhatsApp button */}
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello! I need pharmacy study notes from TalksBhati Pharmacy.')}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 hover:scale-105 w-full">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* ── Contact form ── */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 card p-8 space-y-5">
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input className="input-field" placeholder="Your full name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address *</label>
                <input className="input-field" type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <input className="input-field" placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Subject *</label>
                <select className="input-field" value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option>Notes Request</option>
                  <option>D.Pharma Notes</option>
                  <option>B.Pharma Notes</option>
                  <option>M.Pharma Notes</option>
                  <option>Video Class Request</option>
                  <option>Report Error in Notes</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Message *</label>
              <textarea className="input-field resize-none" rows={5}
                placeholder="Describe what notes you need, which semester/subject, or any other query..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-60 text-base hover:opacity-90"
              style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Send className="w-5 h-5" />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>

        {/* ── Google Map — Dasna, Ghaziabad ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 card overflow-hidden">
          <div className="h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7!2d77.5!3d28.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1b6a4a4a4a5%3A0x0!2sDasna%2C+Ghaziabad%2C+Uttar+Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%"
              style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TalksBhati Pharmacy — Dasna, Ghaziabad" />
          </div>
          <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-100 dark:border-gray-700">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{ADDRESS}</span>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              target="_blank" rel="noopener noreferrer"
              className="ml-auto text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors whitespace-nowrap">
              Open in Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
