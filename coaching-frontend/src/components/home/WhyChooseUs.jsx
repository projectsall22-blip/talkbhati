import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, FolderOpen, Download, Search, RefreshCw, Smartphone } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Semester-wise Notes',
    desc: 'Every note is tagged by program and semester — D.Pharma, B.Pharma Sem 1–8, M.Pharma, Pharm.D.',
    color: '#059669',
  },
  {
    icon: FolderOpen,
    title: 'Subject-wise Organised',
    desc: 'Pharmaceutics, Pharmacology, Medicinal Chemistry, Pharmacognosy — all subjects in one place.',
    color: '#0d9488',
  },
  {
    icon: Download,
    title: 'Free PDF Download',
    desc: 'No login, no payment, no ads. Click download and get your PDF instantly.',
    color: '#0891b2',
  },
  {
    icon: Search,
    title: 'Search & Filter',
    desc: 'Find any note in seconds using the search bar or filter by subject and semester.',
    color: '#7c3aed',
  },
  {
    icon: RefreshCw,
    title: 'Regularly Updated',
    desc: 'Notes are updated as per the latest PCI syllabus and university exam patterns.',
    color: '#db2777',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    desc: 'Study on your phone, tablet, or laptop — the site is fully responsive.',
    color: '#d97706',
  },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} className="text-center mb-12">
          <span className="pill bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4 inline-flex">
            Why TalksBhati?
          </span>
          <h2 className="section-title">
            Simple, Free &{' '}
            <span style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Actually Useful
            </span>
          </h2>
          <p className="section-subtitle">
            No fluff. Just well-organised pharmacy notes that actually help you study.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800/60 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
