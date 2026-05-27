import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'

const programs = [
  {
    name: 'D.Pharma — 1st Year',
    color: '#059669', bg: '#05966912',
    badge: 'Diploma',
    subjects: ['Pharmaceutics – Theory','Pharmaceutical Chemistry','Pharmacognosy – Theory','Human Anatomy & Physiology','Social Pharmacy'],
  },
  {
    name: 'D.Pharma — 2nd Year',
    color: '#0d9488', bg: '#0d948812',
    badge: 'Diploma',
    subjects: ['Pharmacology – Theory','Community Pharmacy & Mgmt','Biochemistry & Clinical Path.','Pharmacotherapeutics','Hospital & Clinical Pharmacy','Pharmacy Law & Ethics'],
  },
  {
    name: 'B.Pharma — Sem 1 & 2',
    color: '#0891b2', bg: '#0891b212',
    badge: 'Bachelor',
    subjects: ['Pharmaceutical Analysis','Pharmaceutics – I','Pharmaceutical Inorganic Chem.','Human Anatomy & Physiology – I','Communication Skills'],
  },
  {
    name: 'B.Pharma — Sem 3 & 4',
    color: '#7c3aed', bg: '#7c3aed12',
    badge: 'Bachelor',
    subjects: ['Pharmaceutical Organic Chem.','Physical Pharmaceutics','Pharmaceutical Microbiology','Pharmacognosy & Phytochem.','Pathophysiology'],
  },
  {
    name: 'B.Pharma — Sem 5 & 6',
    color: '#db2777', bg: '#db277712',
    badge: 'Bachelor',
    subjects: ['Medicinal Chemistry','Industrial Pharmacy','Pharmacology – II','Herbal Drug Technology','Biopharmaceutics & PK'],
  },
  {
    name: 'B.Pharma — Sem 7 & 8',
    color: '#d97706', bg: '#d9770612',
    badge: 'Bachelor',
    subjects: ['Instrumental Methods','Pharmacy Practice','Novel Drug Delivery System','Regulatory Affairs','Pharmacovigilance'],
  },
  {
    name: 'M.Pharma',
    color: '#059669', bg: '#05966912',
    badge: 'Master',
    subjects: ['Advanced Pharmaceutics','Drug Regulatory Affairs','Clinical Research','Advanced Pharmacology','Pharmaceutical Biotech.'],
  },
  {
    name: 'Pharm.D',
    color: '#0d9488', bg: '#0d948812',
    badge: 'Pharm.D',
    subjects: ['Pharmaceutical Chemistry','Pharmacology & Toxicology','Clinical Pharmacy','Hospital Pharmacy','Clinical Pharmacokinetics'],
  },
]

export default function Courses() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} className="text-center mb-12">
          <span className="pill bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4 inline-flex">
            Study Materials
          </span>
          <h2 className="section-title">
            Programs &{' '}
            <span style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Subjects Covered
            </span>
          </h2>
          <p className="section-subtitle">
            Notes for every semester, every subject — organised so you can find what you need in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {programs.map(({ name, color, bg, badge, subjects }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">

              {/* Coloured top strip */}
              <div className="h-1" style={{ background: color }} />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{name}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white shrink-0"
                    style={{ background: color }}>
                    {badge}
                  </span>
                </div>

                {/* Subjects */}
                <ul className="space-y-1.5 mb-4">
                  {subjects.slice(0, 4).map(s => (
                    <li key={s} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-3 h-3 mt-0.5 shrink-0" style={{ color }} />
                      {s}
                    </li>
                  ))}
                  {subjects.length > 4 && (
                    <li className="text-xs font-medium" style={{ color }}>
                      +{subjects.length - 4} more subjects
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <Link to="/notes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200"
                  style={{ color }}>
                  View Notes <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link to="/notes"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-105 hover:opacity-90 shadow-lg"
            style={{ background: 'linear-gradient(135deg,#059669,#0d9488)', boxShadow: '0 8px 24px rgba(5,150,105,0.3)' }}>
            Browse All Notes <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
