import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Filter, Award } from 'lucide-react'
import api from '../utils/api'

const categories = ['All', 'D.Pharma', 'B.Pharma', 'M.Pharma', 'Pharm.D', 'Other']

const placeholderAchievements = [
  { _id: '1', studentName: 'Priya Sharma', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', marks: '892/1000', percentage: '89.2%', rank: 'State Rank 3', exam: 'D.Pharma Final', college: 'Government Pharmacy College', year: '2024', category: 'D.Pharma', featured: true },
  { _id: '2', studentName: 'Rahul Verma', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', marks: '3450/4000', percentage: '86.25%', rank: 'University Topper', exam: 'B.Pharma Final Year', college: 'JSS College of Pharmacy', year: '2024', category: 'B.Pharma', featured: true },
  { _id: '3', studentName: 'Anjali Patel', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', marks: '1780/2000', percentage: '89%', rank: 'Gold Medalist', exam: 'M.Pharma', college: 'Manipal College of Pharmacy', year: '2024', category: 'M.Pharma', featured: true },
  { _id: '4', studentName: 'Vikram Singh', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', marks: '876/1000', percentage: '87.6%', rank: 'District Rank 1', exam: 'D.Pharma Final', college: 'Private Pharmacy College', year: '2024', category: 'D.Pharma', featured: false },
  { _id: '5', studentName: 'Sneha Gupta', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face', marks: '3280/4000', percentage: '82%', rank: 'Distinction', exam: 'B.Pharma Sem 8', college: 'BITS Pilani Pharmacy', year: '2024', category: 'B.Pharma', featured: false },
  { _id: '6', studentName: 'Arjun Mishra', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', marks: '1650/2000', percentage: '82.5%', rank: 'First Class', exam: 'M.Pharma Sem 2', college: 'NIPER Hyderabad', year: '2024', category: 'M.Pharma', featured: false },
]

export default function Achievements() {
  const [achievements, setAchievements] = useState(placeholderAchievements)
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')

  useEffect(() => {
    const params = {}
    if (category !== 'All') params.category = category
    if (year !== 'All') params.year = year
    api.get('/achievements', { params })
      .then(res => { if (res.data.length) setAchievements(res.data) })
      .catch(() => {})
  }, [category, year])

  const filtered = achievements.filter(a =>
    (category === 'All' || a.category === category) &&
    (year === 'All' || a.year === year)
  )

  const years = ['All', ...new Set(achievements.map(a => a.year))].sort((a, b) => b - a)

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg, #78350f, #92400e, #1c1917)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Student <span className="text-yellow-400">Achievements</span>
            </h1>
            <p className="text-orange-100 max-w-xl mx-auto">
              Celebrating the success of our brilliant pharmacy students who made us proud.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === c
                    ? 'text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                }`}
                style={category === c ? { background: 'linear-gradient(to right, #059669, #0d9488)' } : {}}>
                {c}
              </button>
            ))}
          </div>
          <select className="input-field w-auto ml-auto" value={year} onChange={e => setYear(e.target.value)}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>

        {/* Featured */}
        {filtered.filter(a => a.featured).length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h2 className="font-bold text-lg">Featured Achievers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.filter(a => a.featured).map((a, i) => (
                <AchievementCard key={a._id} achievement={a} index={i} featured />
              ))}
            </div>
          </div>
        )}

        {/* All */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.filter(a => !a.featured).map((a, i) => (
            <AchievementCard key={a._id} achievement={a} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No achievements found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AchievementCard({ achievement: a, index, featured }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group card overflow-hidden hover:-translate-y-2 ${featured ? 'ring-2 ring-yellow-400/50' : ''}`}>
      {featured && (
        <div className="text-white text-xs font-bold text-center py-1"
          style={{ background: 'linear-gradient(to right, #f59e0b, #f97316)' }}>
          ⭐ Featured Achiever
        </div>
      )}
      <div className="p-6">
        <div className="relative mb-4">
          <img src={a.photo || `https://ui-avatars.com/api/?name=${a.studentName}&background=059669&color=fff`}
            alt={a.studentName}
            className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
            style={{ background: 'linear-gradient(to right, #059669, #0d9488)' }}>
            {a.rank || a.percentage}
          </div>
        </div>
        <div className="text-center mt-4">
          <h3 className="font-bold text-sm mb-1">{a.studentName}</h3>
          <div className="text-sm font-semibold text-emerald-500 mb-1">{a.exam}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{a.marks}</div>
          {a.college && (
            <div className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg">
              {a.college}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">{a.year}</div>
        </div>
      </div>
    </motion.div>
  )
}
