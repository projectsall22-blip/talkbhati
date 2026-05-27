import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, BookOpen, Download, GraduationCap } from 'lucide-react'

const stats = [
  { icon: Users,         value: '—',  label: 'Students Helped',  color: '#34d399' },
  { icon: BookOpen,      value: '—',  label: 'Notes Available',  color: '#2dd4bf' },
  { icon: Download,      value: '—',  label: 'Total Downloads',  color: '#38bdf8' },
  { icon: GraduationCap, value: '4',  label: 'Programs Covered', color: '#a78bfa' },
]

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section ref={ref} className="py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#022c22 0%,#064e3b 60%,#0f4c3a 100%)' }}>
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center rounded-2xl py-6 px-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}22` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs font-medium" style={{ color: `${color}cc` }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
