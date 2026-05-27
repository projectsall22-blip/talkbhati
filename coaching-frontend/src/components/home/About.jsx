import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Heart, Users, BookOpen } from 'lucide-react'
import founderImg from '../../assets/founder.jpeg'

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — personal touch */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}>
            <span className="pill bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-5 inline-flex">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-snug">
              Built by a Pharmacy Student,<br />
              <span style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                For Pharmacy Students
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
              Hi, I'm <strong className="text-gray-800 dark:text-gray-200">Mazid Ali Khan</strong> — M.Pharma (Pharmaceutics) from AKTU Lucknow.
              I created TalksBhati Pharmacy because I know how hard it is to find well-organised, reliable notes during exam season.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-7 text-sm md:text-base">
              Every note here is carefully structured by semester and subject — so you spend less time searching and more time studying.
              No ads, no paywalls, no signup. Just free, clean pharmacy notes.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'D.Pharma 1st & 2nd year — all subjects',
                'B.Pharma Sem 1 to 8 — complete notes',
                'M.Pharma & Pharm.D materials',
                'Free PDF download, always',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Users,     value: '—',    label: 'Students helped', color: '#059669' },
                { icon: BookOpen,  value: '—',    label: 'Notes uploaded',  color: '#0d9488' },
                { icon: Heart,     value: '100%', label: 'Free forever',    color: '#db2777' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — founder photo with warm card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex justify-center lg:justify-end">
            <div className="relative max-w-sm w-full">
              {/* Photo card */}
              <div className="rounded-3xl overflow-hidden shadow-xl"
                style={{ border: '2px solid rgba(5,150,105,0.2)' }}>
                <img src={founderImg} alt="Mazid Ali Khan"
                  className="w-full h-72 object-cover object-top" />
                <div className="p-5 bg-white dark:bg-gray-800">
                  <div className="font-bold text-gray-900 dark:text-white">Mazid Ali Khan</div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                    M.Pharma (Pharmaceutics) · AKTU Lucknow
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    "I built this platform so no pharmacy student has to struggle finding good notes. Study smart, serve better."
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 rounded-2xl px-3 py-2 shadow-lg text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}>
                Research Published<br />
                <span className="font-normal opacity-90">NeuroQuantology 2022</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
