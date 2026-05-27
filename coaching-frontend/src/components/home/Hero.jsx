import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Download, Play, CheckCircle } from 'lucide-react'
import founderImg from '../../assets/founder.jpeg'

const highlights = [
  'D.Pharma, B.Pharma & M.Pharma notes',
  'Semester-wise & subject-wise organized',
  'Free PDF download — no signup needed',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Soft background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #022c22 0%, #064e3b 55%, #0f4c3a 100%)' }} />

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2334d399\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 animate-float"
        style={{ background: 'radial-gradient(circle, #0d9488, transparent)', animationDelay: '2.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left ── */}
          <div>
            {/* Tag */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 text-sm font-medium text-emerald-300"
              style={{ background: 'rgba(5,150,105,0.18)', border: '1px solid rgba(52,211,153,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Free Pharmacy Study Notes — India
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5">
              Your Pharmacy<br />
              Notes,{' '}
              <span className="relative inline-block">
                <span style={{ background: 'linear-gradient(90deg,#34d399,#2dd4bf,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Organised
                </span>
                {/* underline squiggle */}
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,3 Q25,0 50,3 Q75,6 100,3 Q125,0 150,3 Q175,6 200,3" stroke="#34d399" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}&amp; Free
            </motion.h1>

            {/* Sub */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Semester-wise study materials for D.Pharma, B.Pharma &amp; M.Pharma — created by
              <span className="text-emerald-300 font-medium"> Mazid Ali Khan</span>, M.Pharma (Pharmaceutics).
              No signup. No cost. Just notes.
            </motion.p>

            {/* Checklist */}
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="space-y-2.5 mb-9">
              {highlights.map((h, i) => (
                <motion.li key={h} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3">
              <Link to="/notes"
                className="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all hover:scale-105 hover:opacity-90 shadow-lg"
                style={{ background: 'linear-gradient(135deg,#059669,#0d9488)', boxShadow: '0 8px 24px rgba(5,150,105,0.35)' }}>
                <Download className="w-4 h-4" /> Download Notes
              </Link>
              <Link to="/videos"
                className="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <Play className="w-4 h-4 fill-white" /> Watch Classes
              </Link>
            </motion.div>
          </div>

          {/* ── Right — founder card ── */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="relative w-72 rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(52,211,153,0.3)' }}>
                <img src={founderImg} alt="Mazid Ali Khan — Founder"
                  className="w-full h-80 object-cover object-top" />
                {/* Overlay gradient */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(2,44,34,0.85) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-bold text-base">Mazid Ali Khan</div>
                  <div className="text-emerald-300 text-xs mt-0.5">M.Pharma (Pharmaceutics) · Founder</div>
                </div>
              </div>

              {/* Floating stat cards */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -top-5 -right-8 rounded-2xl px-4 py-3 shadow-xl text-center"
                style={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <div className="text-emerald-400 font-bold text-xl">—</div>
                <div className="text-gray-400 text-xs">Notes</div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-8 rounded-2xl px-4 py-3 shadow-xl text-center"
                style={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <div className="text-teal-400 font-bold text-xl">—</div>
                <div className="text-gray-400 text-xs">Students</div>
              </motion.div>

              {/* Program badges */}
              <div className="absolute top-1/2 -right-14 -translate-y-1/2 flex flex-col gap-2">
                {['D.Pharma', 'B.Pharma', 'M.Pharma'].map((p, i) => (
                  <motion.div key={p}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ background: ['#059669','#0d9488','#0891b2'][i] }}>
                    {p}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom quick-stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 md:grid-cols-3 gap-4 max-w-lg">
          {[
            { icon: BookOpen,  value: '—', label: 'Study Notes' },
            { icon: Download,  value: '—', label: 'Downloads' },
            { icon: ArrowRight, value: '4', label: 'Programs' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-white font-bold text-sm leading-none">{value}</div>
                <div className="text-gray-400 text-xs mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
