import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Sharma',
    program: 'D.Pharma – 2nd Year',
    text: 'TalksBhati saved my semester! Every subject was right there, organised perfectly. I found what I needed in minutes.',
    rating: 5,
    initials: 'PS',
    color: '#059669',
  },
  {
    name: 'Rahul Verma',
    program: 'B.Pharma – Sem 5',
    text: 'The Pharmacology and Medicinal Chemistry notes match our university syllabus exactly. Best free resource I have found.',
    rating: 5,
    initials: 'RV',
    color: '#0d9488',
  },
  {
    name: 'Anjali Patel',
    program: 'B.Pharma – Sem 3',
    text: 'Free PDF downloads with no signup — that alone makes this the best pharmacy notes site. Bookmarked it immediately.',
    rating: 5,
    initials: 'AP',
    color: '#0891b2',
  },
  {
    name: 'Vikram Singh',
    program: 'M.Pharma – Sem 1',
    text: 'Even M.Pharma notes are comprehensive here. The search filter is super fast. Highly recommend to all pharmacy students.',
    rating: 5,
    initials: 'VS',
    color: '#7c3aed',
  },
  {
    name: 'Sneha Gupta',
    program: 'D.Pharma – 1st Year',
    text: 'As a first-year student I was lost. TalksBhati organised everything year by year, subject by subject. Thank you so much!',
    rating: 5,
    initials: 'SG',
    color: '#db2777',
  },
  {
    name: 'Arjun Mishra',
    program: 'B.Pharma – Sem 7',
    text: 'Novel Drug Delivery and Regulatory Affairs notes are excellent. Accurate, well-referenced, and completely free.',
    rating: 5,
    initials: 'AM',
    color: '#d97706',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} className="text-center mb-10">
          <span className="pill bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4 inline-flex">
            Student Reviews
          </span>
          <h2 className="section-title">
            What Students{' '}
            <span style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Are Saying
            </span>
          </h2>
          <p className="section-subtitle">
            Real feedback from pharmacy students across India who use TalksBhati every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map(({ name, program, text, rating, initials, color }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                "{text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: color }}>
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{name}</div>
                  <div className="text-xs text-gray-400">{program}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
